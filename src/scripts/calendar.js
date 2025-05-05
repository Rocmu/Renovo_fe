// Import styles and utilities
import '../styles/main.css';
import '../styles/calendar.css';
import { showToast } from './toast.js';
import {fetchData} from './fetch.js';

// Global variable to store current calendar instance
let currentCalendar = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {

  // Initialize FullCalendar
  const calendarEl = document.getElementById('calendarView');
  const calendar = new FullCalendar.Calendar(calendarEl, {

    // Calendar configuration
    initialView: 'dayGridMonth',
    timeZone: 'local',
    locale: 'fi',
    firstDay: 1, // Monday as first day of week
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    titleFormat: { year: 'numeric', month: 'long' },

    eventClassNames: function(arg) {
      return arg.event.extendedProps.type + '-event';
    },

    // Fetch events asynchronously
    events: async function (fetchInfo, successCallback, failureCallback) {
      try {
        // Get user ID and token from local storage
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        // Fetch all event types in parallel
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

        // Format events for FullCalendars
        const events = [
          // Shift events
          ...shifts.map((shift) => ({
            id: `shift_${shift.shift_id || shift.id}`,
            title: 'Työvuoro',
            start: `${shift.start_date.slice(0, 10)}T${shift.start_time.slice(0, 10)}`,
            end: `${shift.end_date.slice(0, 10)}T${shift.end_time.slice(0, 10)}`,
            className: ['shift-event'],
            extendedProps: {
              type: 'shift',
              _id: shift.shift_id || shift.id,
              is_night_shift: shift.is_night_shift
            },
          })),
          // Exercise events
          ...exercise.map((ex) => ({
            id: `ex_${ex.Exercise_id}`,
            title: ex.exercise_type,
            start: ex.exercise_date.slice(0, 10),
            className: ['exercise-event'],
            extendedProps: {
              type: 'exercise',
              level: ex.level,
              notes: ex.notes,
            },
          })),
          // Sickness events
          ...sickness.map((sick) => ({
            id: `sick_${sick.Sickness_id}`,
            title: sick.description,
            start: sick.sickness_date.slice(0, 10),
            className: ['sickness-event'],
            extendedProps: {
              type: 'sickness',
              impact: sick.impact,
              notes: sick.notes,
            },
          })),
          // Other events
          ...others.map((other) => ({
            id: `other_${other.Others_id}`,
            title: other.description,
            start: other.others_date.slice(0, 10),
            className: ['others-event'],
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
        if (error == 'jwt expired') {
          localStorage.clear();
          location.href='index.html';
          return
        }
        failureCallback(error);
      }
    },

    // Mouse hover effect for events
    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
      info.el.title = 'Klikkaa muokataksesi';
    },

    // Handle event clicks
    eventClick: function(info) {
      const event = info.event;
      const props = event.extendedProps;

      // Handle shift event separately
      if (props.type === 'shift') {
        document.getElementById('editShiftModal').style.display = 'block';
        document.getElementById('editDate').value = event.startStr.split('T')[0];
        document.getElementById('editStartTime').value = event.startStr.split('T')[1].slice(0, 5);
        document.getElementById('editEndTime').value = event.endStr.split('T')[1].slice(0, 5);
        document.getElementById('eventId').value = props._id;
      } else {
        // Handle other event types (exercise, sickenss, others)
        const modal = document.getElementById('editModal');
        const form = modal.querySelector('#editEventForm');

        // Set title based on event type
        const titleMap = {
          exercise: 'Muokkaa liikuntasuoritusta',
          sickness: 'Muokkaa sairastumista',
          others: 'Muokkaa muuta tapahtumaa'
        };
        modal.querySelector('h2').textContent = titleMap[props.type] || 'Muokkaa tapahtumaa';

        // Hide all fields initially
        form.start_time.closest('label').style.display = 'none';
        form.end_time.closest('label').style.display = 'none';
        form.level.closest('label').style.display = 'none';

        // Show relevant fields based on event type
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

        // Fill the form
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
    },

    // Custom event rendering
    eventContent: function(arg) {
      const { event } = arg;
      const props = event.extendedProps;

      // A specific rendering for shifts
      if (props.type === 'shift') {
        const startTime = event.start ? event.start.toLocaleTimeString('fi-FI', {hour: '2-digit', minute:'2-digit'}) : '';
        const endTime = event.end ? event.end.toLocaleTimeString('fi-FI', {hour: '2-digit', minute:'2-digit'}) : '';

        return {
          html: `
            <div class="custom-shift-event">
              <div class="shift-time">${startTime} - ${endTime}</div>
            </div>
          `,
        };
      }

      // rendering for other events
      const iconMap = {
        exercise: '🏋️',
        sickness: '🤒',
        others: '📌'
      };

      return {
        html: `
          <div class="event-container">
            <span class="event-icon">${iconMap[props.type] || '❔'}</span>
            <span class="event-text">${event.title}</span>
          </div>
        `
      };
    }
  });

  // Store and render calendar
  currentCalendar = calendar;
  calendar.render();
  calendar.refetchEvents();

  // Shift modal elements
  const shiftModal = document.getElementById("shiftModal");
  const formTable = document.querySelector(".form-shift-table");
  const openShiftModalBtn = document.getElementById("openShiftModal");

  // Generate day inputs for current month
  function generateDaysOfMonth() {
    const calendarDate = currentCalendar.getDate();
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    formTable.innerHTML = '<div class="form-shift-header"><span>Vuoron alkamis aika:</span><span>Vuoron päättymis aika:</span></div>';

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const weekdayAbbr = date.toLocaleDateString('fi-FI', { weekday: 'short' });

        const row = document.createElement("div");
        row.className = "form-row";
        row.innerHTML = `
            <label>${weekdayAbbr} ${i}.${month + 1}.</label>
            <input type="time" name="start_${i}">
            <span>-</span>
            <input type="time" name="end_${i}">
        `;
        formTable.appendChild(row);
    }
  }

  // Modal opening logic
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

  // Shift form submission
  document.getElementById('shiftForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get current month from calendar
    const calendarDate = currentCalendar.getDate();
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth(); // 0-BASED

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    let savedCount = 0;
    const errors = [];

    // Process each day's shift data
    for (let i = 1; i <= daysInMonth; i++) {
      const startInput = document.querySelector(`[name="start_${i}"]`);
      const endInput = document.querySelector(`[name="end_${i}"]`);

      if (startInput && endInput && startInput.value && endInput.value) {
        try {
          const startTime = startInput.value;
          const endTime = endInput.value;

          const startDate = new Date(year, month, i);
          let endDate = new Date(year, month, i);

          const [startHours, startMinutes] = startTime.split(':').map(Number);
          const [endHours, endMinutes] = endTime.split(':').map(Number);

          startDate.setHours(startHours, startMinutes);
          endDate.setHours(endHours, endMinutes);

          // Chech for night shift (ends the next day)
          const isNightShift = endDate < startDate;
          if (isNightShift) {
            endDate.setDate(endDate.getDate() + 1);
          }

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

          const response = await fetch('http://localhost:3000/api/shifts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(shift)
          });

          if (!response.ok) {
            if (response.status == 403) {
              localStorage.clear();
              location.href='index.html';
              return
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          savedCount++;
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
      calendar.refetchEvents(); // IMPORTANT! - Refresh all months
    } else {
      showToast('Ei tallennettuja työvuoroja');
    }

    closeModal('shiftModal');
  });

  // Other form submissions
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

  // General form submission function
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
        if (response.error == 'jwt expired') {
          localStorage.clear();
          location.href='index.html';
          return
        }
        throw new Error(response.error);
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} tallennettu!`);
      closeModal(`${type}Modal`);
      calendar.refetchEvents();
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      alert(`Virhe tallennettaessa ${type}: ${error.message}`);
      if (error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }
    }
  }

  // Edit shift form submission
  document.getElementById('editShiftForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const shiftId = document.getElementById('eventId').value;
    const editDate = document.getElementById('editDate').value;
    const editStartTime = document.getElementById('editStartTime').value;
    const editEndTime = document.getElementById('editEndTime').value;

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      // Check for night shift (end time < start time)
      const startDate = new Date(`${editDate}T${editStartTime}`);
      const endDate = new Date(`${editDate}T${editEndTime}`);
      const isNightShift = endDate < startDate;

      // Handle night shift (end date is next day)
      let endDateStr = editDate;
      if (isNightShift) {
        const nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate() + 1);
        endDateStr = nextDay.toISOString().split('T')[0];
      }

      const updatedShift = {
        user_id: userId,
        start_date: editDate,
        start_time: editStartTime + ':00',
        end_date: endDateStr, // USE ADJUSTED DATE FOR NIGHT SHIFTS
        end_time: editEndTime + ':00',
        is_night_shift: isNightShift
      };

      const response = await fetchData(`http://localhost:3000/api/shifts/${shiftId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedShift)
      });

      if (response.error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }

      if (response.error) throw new Error(response.error);

      // Update shift in calendar
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
      if (error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }
      console.error('Virhe työvuoron päivityksessä:', error);
      showToast('Virhe päivitettäessä työvuoroa: ' + error.message);
    }
  });

  // Delete shift
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

      if (response.error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }

      if (response.error) throw new Error(response.error);

      // Remove shift form calendar
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

  // Edit event form submission
  document.getElementById('editEventForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = localStorage.getItem('user_id');

    const form = e.target;
    const id = form.event_id.value;
    const type = form.event_type.value;

    console.log(type)

    // Parse event ID correctly
    const eventId = id.split('_')[1]; // EXTRACT THE ACTUAL ID
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

    // Build data object based on event type
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
      if (error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }
      alert('Virhe päivitettäessä tapahtumaa: ' + error.message);
    }
  });

  // Delete event
  document.getElementById('deleteEventButton').addEventListener('click', async function () {
    const form = document.getElementById('editEventForm');
    const id = form.event_id.value;
    const type = form.event_type.value;

    const eventId = id.split('_')[1]; // EXTRACT EVENT ID
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

      if (response.error == 'jwt expired') {
        localStorage.clear();
        location.href='index.html';
        return
      }

      if (response.error) throw new Error(response.error);

      alert('Tapahtuma poistettu!');
      closeModal('editModal');
      calendar.refetchEvents();
    } catch (error) {
      alert('Virhe poistettaessa tapahtumaa: ' + error.message);
    }
  });

  function toggleInfo(event) {
    event.preventDefault();
    const info = document.querySelector('.calendar-info');
    const button = document.querySelector('#event-instructions');

    if (info.style.display === 'flex') {
      info.style.animation = 'disappear 1s ease-out forwards';
      button.textContent = 'Lisätietoa tapahtumien tallennuksesta';
      setTimeout(() => {
        info.style.display = 'none';
      }, 1000);
    } else {
      info.style.display = 'flex';
      info.style.animation = 'appear 1s ease-out forwards';
      button.textContent = 'Piilota lisätiedot';
      info.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const infoBtnOne = document.querySelector('#event-instructions');
  infoBtnOne.addEventListener('click', toggleInfo);

  // Modal closing function
  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none';
  };

});
