import '../styles/main.css';
import '../styles/calendar.css';
import { showToast } from './toast.js';
import {fetchData} from './fetch.js';

document.addEventListener('DOMContentLoaded', function () {

  // Kalenterin alustus
  const calendarEl = document.getElementById('calendarView');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'fi',
    firstDay: 1,
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },

    titleFormat: { year: 'numeric', month: 'long' },
    events: async function (fetchInfo, successCallback, failureCallback) {
      try {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        /* Hae kaikki tapahtumat
        const shifts = await fetchData(`http://localhost:3000/api/shifts/user/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        */
        //console.log(shifts)
        // Muotoile tapahtumat FullCalendarille

        const [shifts, exercise, sickness, others] = await Promise.all([
          fetchData(`http://localhost:3000/api/shifts/user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetchData(`http://localhost:3000/api/exercise/user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetchData(`http://localhost:3000/api/sickness/user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetchData(`http://localhost:3000/api/others/user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Muotoile tapahtumat FullCalendarille

        //const readiness = response.results.map((rivi) => rivi.result.readiness);
        const events = [
          ...shifts.map((shift) => ({
            id: `shift_${shift.shift_id || shift.id}`,
            title: 'Työvuoro',
            start: `${shift.start_date.slice(0, 10)}T${shift.start_time.slice(0, 10)}`,
            end: `${shift.end_date.slice(0, 10)}T${shift.end_time.slice(0, 10)}`,
            backgroundColor: '#0044cc',
            textColor: 'white',
            extendedProps: {
              type: 'shift',
              _id: shift.shift_id || shift.id,
            },
          })),
          ...exercise.map((ex) => ({
            id: `ex_${ex.Exercise_id}`,
            title: ex.exercise_type,
            start: `${ex.exercise_date.slice(0, 10)}T${ex.start_time.slice(0, 10)}`,
            end: `${ex.exercise_date.slice(0, 10)}T${ex.end_time.slice(0, 10)}`,
            color: 'green', // Vihreä liikunnalle
            extendedProps: {
              type: 'exercise',
              level: ex.level,
              notes: ex.notes,
            },
          })),
          ...sickness.map((sick) => ({
            id: `sick_${sick.Sickness_id}`,
            title: sick.description,
            start: sick.sickness_date.slice(0, 10),
            color: '#F44336', // Punainen sairastumisille
            extendedProps: {
              type: 'sickness',
              impact: sick.impact,
              notes: sick.notes,
            },
          })),
          ...others.map((other) => ({
            id: `other_${other.Others_id}`,
            title: other.description,
            start: other.others_date.slice(0, 10),
            color: '#FFC107', // Keltainen muille tapahtumille
            extendedProps: {
              type: 'others',
              intensity: other.intensity,
              notes: other.notes,
            },
          })),
        ];

        console.log(events)

        successCallback(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        failureCallback(error);
      }
    },
     // Hiiren hover -efekti tapahtumien päällä
     eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
      info.el.title = 'Klikkaa muokataksesi';
    },

    eventClick: function(info) {
      const event = info.event;
      const props = event.extendedProps;

      if (props.type === 'shift') {
        // Käsittele työvuoro erikseen
        document.getElementById('editShiftModal').style.display = 'block';
        document.getElementById('editDate').value = event.startStr.split('T')[0];
        document.getElementById('editStartTime').value = event.startStr.split('T')[1].slice(0, 5);
        document.getElementById('editEndTime').value = event.endStr.split('T')[1].slice(0, 5);
        document.getElementById('eventId').value = props._id;
      } else {
        // Käsittele muut tapahtumat (liikunta, sairastumiset jne.)
        const modal = document.getElementById('editModal');
        const form = modal.querySelector('#editEventForm');

        // Aseta otsikko tyypin mukaan
        const titleMap = {
          exercise: 'Muokkaa liikuntasuoritusta',
          sickness: 'Muokkaa sairastumista',
          others: 'Muokkaa muuta tapahtumaa'
        };
        modal.querySelector('h2').textContent = titleMap[props.type] || 'Muokkaa tapahtumaa';

        // Piilota kaikki kentät aluksi
        form.start_time.closest('label').style.display = 'none';
        form.end_time.closest('label').style.display = 'none';
        form.level.closest('label').style.display = 'none';

        // Näytä tarvittavat kentät
        switch (props.type) {
          case 'exercise':
            form.start_time.closest('label').style.display = 'block';
            form.end_time.closest('label').style.display = 'block';
            form.level.closest('label').style.display = 'block';
            break;
          case 'sickness':
          case 'others':
            form.level.closest('label').style.display = 'block';
            break;
        }

        // Täytä lomake
        form.event_id.value = event.id;
        form.event_type.value = props.type;
        form.date.value = event.startStr.split('T')[0];
        form.description.value = event.title;

        if (event.startStr.includes('T')) {
          form.start_time.value = event.startStr.split('T')[1].slice(0, 5);
        }

        if (event.endStr && event.endStr.includes('T')) {
          form.end_time.value = event.endStr.split('T')[1].slice(0, 5);
        }

        form.level.value = props.level || props.impact || props.intensity || '';
        form.notes.value = props.notes || '';

        modal.style.display = 'block';
      }
    }
  });

  calendar.render();

  // Lataa tapahtumat sivun latauksen yhteydessä
  calendar.refetchEvents();

  const shiftModal = document.getElementById("shiftModal");
  const formTable = document.querySelector(".form-shift-table");
  const openShiftModalBtn = document.getElementById("openShiftModal");

  // Generoi päivät kuukaudelle
  function generateDaysOfMonth() {
      const now = new Date();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      formTable.innerHTML = '<div class="form-shift-header"><span>alkaa:</span><span>päättyy:</span></div>';

      for (let i = 1; i <= daysInMonth; i++) {
          const row = document.createElement("div");
          row.className = "form-row";
          row.innerHTML = `
              <label>${i}.${now.getMonth() + 1}.</label>
              <input type="time" name="start_${i}">
              <span>-</span>
              <input type="time" name="end_${i}">
          `;
          formTable.appendChild(row);
      }
  }

  // Modaalien avauslogiikka
  document.getElementById('openShiftModal').addEventListener('click', () => {
    generateDaysOfMonth();
    shiftModal.style.display = 'block';
  });

  document.getElementById('openExerciseModal').addEventListener('click', () => {
    document.getElementById('exerciseModal').style.display = 'block';
  });

  document.getElementById('openSicknessModal').addEventListener('click', () => {
    document.getElementById('sicknessModal').style.display = 'block';
  });

  document.getElementById('openOthersModal').addEventListener('click', () => {
    document.getElementById('othersModal').style.display = 'block';
  });

  document.getElementById('shiftForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    let savedCount = 0;
    const errors = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const startInput = document.querySelector(`[name="start_${i}"]`);
      const endInput = document.querySelector(`[name="end_${i}"]`);

      if (startInput && endInput && startInput.value && endInput.value) {
        try {
          const startTime = startInput.value;
          const endTime = endInput.value;

          // Muodosta päivämäärät
          const startDate = new Date(year, month, i);
          let endDate = new Date(year, month, i);

          // Muunna ajat Date-olioiksi vertailua varten
          const [startHours, startMinutes] = startTime.split(':').map(Number);
          const [endHours, endMinutes] = endTime.split(':').map(Number);

          startDate.setHours(startHours, startMinutes);
          endDate.setHours(endHours, endMinutes);

          // Tarkista onko lopetusaika ennen aloitusaikaa (yövuoro)
          const isNightShift = endDate < startDate;

          // Jos yövuoro, siirrä päättymispäivää yhdellä
          if (isNightShift) {
            endDate.setDate(endDate.getDate() + 1);
          }

          // Muodosta päivämäärämerkkijonot
          const startDateStr = startDate.toISOString().split('T')[0];
          const endDateStr = endDate.toISOString().split('T')[0];

          const shift = {
            user_id: parseInt(userId),
            start_date: startDateStr,
            start_time: `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}:00`,
            end_date: endDateStr,
            end_time: `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`,
            is_night_shift: isNightShift
          };

          console.log('Tallennetaan shift:', shift);

          const response = await fetch('http://localhost:3000/api/shifts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(shift)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          savedCount++;

          calendar.addEvent({
            id: `shift_${result.id || result._id}`,
            title: 'Työvuoro' + (isNightShift ? ' (yö)' : ''),
            start: `${shift.start_date}T${shift.start_time}`,
            end: `${shift.end_date}T${shift.end_time}`,
            backgroundColor: isNightShift ? '#002366' : '#0044cc',
            textColor: 'white',
            extendedProps: {
              type: 'shift',
              _id: result.id || result._id,
              is_night_shift: isNightShift
            }
          });

        } catch (err) {
          console.error(`Tallennusvirhe päivälle ${i}.${month + 1}:`, err);
          errors.push(`Päivä ${i}.${month + 1}. ei tallentunut: ${err.message}`);
        }
      }
    }

    if (errors.length > 0) {
      showToast(`Virheitä tallennuksessa: ${errors.join(', ')}`);
    } else if (savedCount > 0) {
      showToast(`Tallennettu ${savedCount} työvuoro(a)`);
      calendar.refetchEvents();
    } else {
      showToast('Ei tallennettuja työvuoroja');
    }

    closeModal('shiftModal');
  });

  // muiden lomakkeiden lähetyslogiikka
  document.getElementById('exerciseForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await submitForm('exerciseForm', 'exercise', 'http://localhost:3000/api/exercise');
  });

  document.getElementById('sicknessForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await submitForm('sicknessForm', 'sickness', 'http://localhost:3000/api/sickness');
  });

  document.getElementById('othersForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await submitForm('othersForm', 'others', 'http://localhost:3000/api/others');
  });

  // Yleinen lomakkeen lähetysfunktio
  async function submitForm(formId, type, url) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.user_id = localStorage.getItem('user_id');

    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetchData(url, options);

      if (response.error) {
        throw new Error(response.error);
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} tallennettu!`);
      closeModal(`${type}Modal`);
      calendar.refetchEvents(); // Päivitä kalenteri
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      alert(`Virhe tallennettaessa ${type}: ${error.message}`);
    }
  }

  document.getElementById('editShiftForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const shiftId = document.getElementById('eventId').value;
    const editDate = document.getElementById('editDate').value;
    const editStartTime = document.getElementById('editStartTime').value;
    const editEndTime = document.getElementById('editEndTime').value;

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      const updatedShift = {
        user_id: userId,
        start_date: editDate,
        start_time: editStartTime + ':00',
        end_date: editDate,
        end_time: editEndTime + ':00'
      };

      const response = await fetchData(`http://localhost:3000/api/shifts/${shiftId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedShift)
      });

      if (response.error) throw new Error(response.error);

      // Päivitä kalenterissa
      const event = calendar.getEventById(`shift_${shiftId}`);
      if (event) {
        event.setDates(
          `${updatedShift.start_date}T${updatedShift.start_time}`,
          `${updatedShift.end_date}T${updatedShift.end_time}`
        );
      }

      showToast('Työvuoro päivitetty!');
      closeModal('editShiftModal');
    } catch (error) {
      console.error('Virhe työvuoron päivityksessä:', error);
      showToast('Virhe päivitettäessä työvuoroa: ' + error.message);
    }
  });

  // Työvuoron poistaminen
  document.getElementById('deleteShiftButton').addEventListener('click', async function() {
    if (!confirm('Haluatko varmasti poistaa tämän työvuoron?')) return;

    const shiftId = document.getElementById('eventId').value;

    console.log('what' + shiftId)

    try {
      const token = localStorage.getItem('token');
      const response = await fetchData(`http://localhost:3000/api/shifts/${shiftId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.error) throw new Error(response.error);

      // Poista kalenterista
      const event = calendar.getEventById(`shift_${shiftId}`);
      if (event) {
        event.remove();
      }

      showToast('Työvuoro poistettu!');
      closeModal('editShiftModal');
    } catch (error) {
      console.error('Virhe työvuoron poistossa:', error);
      showToast('Virhe poistettaessa työvuoroa: ' + error.message);
    }
  });

  document.getElementById('editEventForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = localStorage.getItem('user_id');

    const form = e.target;
    const id = form.event_id.value;
    const type = form.event_type.value;

    console.log(type)

    // Ensure ID is correctly parsed
    const eventId = id.split('_')[1]; // Extract the actual ID (e.g., "123" from "ex_123")
    if (!eventId) {
      alert('Tapahtuman ID on puutteellinen!');
      return;
    }

    const urlMap = {
      exercise: `http://localhost:3000/api/exercise/${eventId}`,
      sickness: `http://localhost:3000/api/sickness/${eventId}`,
      others: `http://localhost:3000/api/others/${eventId}`,
    };

    let data = {
    };

    // Tästä suuttuu
    if (type === 'exercise') {
      form.start_time.closest('label').style.display = 'block';
      form.end_time.closest('label').style.display = 'block';
      form.level.closest('label').style.display = 'block';
      data = {
        user_id: userId,
        [`${type}_date`]: form.date.value,
        exercise_type: form.description.value,
        start_time: form.start_time.value,
        end_time: form.end_time.value,
        level: form.level.value,
        notes: form.notes.value,
      };
      console.log(data)
    } else if (type === 'sickness') {
      form.start_time.closest('label').style.display = 'none';
      form.end_time.closest('label').style.display = 'none';
      form.level.closest('label').style.display = 'block';
      data = {
        user_id: userId,
        [`${type}_date`]: form.date.value,
        description: form.description.value,
        impact: form.level.value,
        notes: form.notes.value,
      };
      console.log(data)
    } else if (type === 'others') {
      form.start_time.closest('label').style.display = 'none';
      form.end_time.closest('label').style.display = 'none';
      form.level.closest('label').style.display = 'block';
      data = {
        user_id: userId,
        [`${type}_date`]: form.date.value,
        description: form.description.value,
        intensity: form.level.value,
        notes: form.notes.value,
      };
     console.log(data)
    }

    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetchData(urlMap[type], options);

      if (response.error) throw new Error(response.error);

      alert('Tapahtuma päivitetty!');
      closeModal('editModal');
      calendar.refetchEvents();
    } catch (error) {
      alert('Virhe päivitettäessä tapahtumaa: ' + error.message);
    }
  });

  document.getElementById('deleteEventButton').addEventListener('click', async function () {
    const form = document.getElementById('editEventForm');
    const id = form.event_id.value;
    const type = form.event_type.value;

    const eventId = id.split('_')[1]; // Extract event ID
    if (!eventId) {
      alert('Tapahtuman ID on puutteellinen!');
      return;
    }

    const urlMap = {
      exercise: `http://localhost:3000/api/exercise/${eventId}`,
      sickness: `http://localhost:3000/api/sickness/${eventId}`,
      others: `http://localhost:3000/api/others/${eventId}`,
    };

    if (!confirm('Haluatko varmasti poistaa tämän tapahtuman?')) return;

    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetchData(urlMap[type], options);

      if (response.error) throw new Error(response.error);

      alert('Tapahtuma poistettu!');
      closeModal('editModal');
      calendar.refetchEvents();
    } catch (error) {
      alert('Virhe poistettaessa tapahtumaa: ' + error.message);
    }
  });

  // sulkemisfunktio kaikille modaaleille
  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none';
  };

  // Klikkaus modalin ulkopuolelle sulkee modaalin
  window.onclick = function (event) {
    if (event.target.classList.contains('calendar-modal')) {
      closeModal(event.target.id);
    }
  };

  // Uloskirjautuminen
  document.getElementById('log-out-user').addEventListener('click', function () {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});
