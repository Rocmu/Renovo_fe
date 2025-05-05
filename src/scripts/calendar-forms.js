import { fetchData } from './fetch.js';
import { showToast } from './toast.js';
import { customConfirm } from './toast.js';
import { getCurrentCalendar } from './calendar-core.js';

export function initializeFormHandlers(calendar) {
  // Shift form submission
  document.getElementById('shiftForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await handleShiftFormSubmit(calendar);
  });

  // Other form submissions
  document.getElementById('exerciseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await submitForm('exerciseForm', 'exercise', 'http://localhost:3000/api/exercise', calendar);
  });

  document.getElementById('sicknessForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await submitForm('sicknessForm', 'sickness', 'http://localhost:3000/api/sickness', calendar);
  });

  document.getElementById('othersForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await submitForm('othersForm', 'others', 'http://localhost:3000/api/others', calendar);
  });

  // Edit shift form
  document.getElementById('editShiftForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await handleEditShiftForm(calendar);
  });

  // Delete shift
  document.getElementById('deleteShiftButton').addEventListener('click', async function() {
    await handleDeleteShift(calendar);
  });

  // Edit event form
  document.getElementById('editEventForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await handleEditEventForm(calendar);
  });

  // Delete event
  document.getElementById('deleteEventButton').addEventListener('click', async function() {
    await handleDeleteEvent(calendar);
  });
}

async function handleShiftFormSubmit(calendar) {
  const calendarDate = calendar.getDate();
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
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

        const startDate = new Date(year, month, i);
        let endDate = new Date(year, month, i);

        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        startDate.setHours(startHours, startMinutes);
        endDate.setHours(endHours, endMinutes);

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
            return;
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
    calendar.refetchEvents();
  } else {
    showToast('Ei tallennettuja työvuoroja');
  }

  closeModal('shiftModal');
}

async function submitForm(formId, type, url, calendar) {
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
        return;
      }
      throw new Error(response.error);
    }

    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} tallennettu!`);
    closeModal(`${type}Modal`);
    calendar.refetchEvents();
  } catch (error) {
    if (error == 'jwt expired') {
      localStorage.clear();
      location.href='index.html';
      return;
    }
    console.error(`Error saving ${type}:`, error);
    showToast(`Virhe tallennettaessa ${type}: ${error.message}`);
  }
}

async function handleEditShiftForm(calendar) {
  const shiftId = document.getElementById('eventId').value;
  const editDate = document.getElementById('editDate').value;
  const editStartTime = document.getElementById('editStartTime').value;
  const editEndTime = document.getElementById('editEndTime').value;

  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const startDate = new Date(`${editDate}T${editStartTime}`);
    const endDate = new Date(`${editDate}T${editEndTime}`);
    const isNightShift = endDate < startDate;

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
      end_date: endDateStr,
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
      return;
    }

    if (response.error) throw new Error(response.error);

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
      return;
    }
    console.error('Virhe työvuoron päivityksessä:', error);
    showToast('Virhe päivitettäessä työvuoroa: ' + error.message);
  }
}

async function handleDeleteShift(calendar) {
  const isConfirmed = await customConfirm('Haluatko varmasti poistaa tämän työvuoron?');
  if (!isConfirmed) return;

  const shiftId = document.getElementById('eventId').value;

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
      return;
    }

    if (response.error) throw new Error(response.error);

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
}

async function handleEditEventForm(calendar) {
  const userId = localStorage.getItem('user_id');
  const form = document.getElementById('editEventForm');
  const id = form.event_id.value;
  const type = form.event_type.value;
  const eventId = id.split('_')[1];

  if (!eventId) {
    showToast('Tapahtuman ID on puutteellinen!');
    return;
  }

  const urlMap = {
    exercise: `http://localhost:3000/api/exercise/${eventId}`,
    sickness: `http://localhost:3000/api/sickness/${eventId}`,
    others: `http://localhost:3000/api/others/${eventId}`,
  };

  let data = {};

  if (type === 'exercise') {
    data = {
      user_id: userId,
      [`${type}_date`]: form.date.value,
      exercise_type: form.description.value,
      start_time: form.start_time.value,
      end_time: form.end_time.value,
      level: form.level.value,
      notes: form.notes.value,
    };
  } else if (type === 'sickness') {
    data = {
      user_id: userId,
      [`${type}_date`]: form.date.value,
      description: form.description.value,
      impact: form.level.value,
      notes: form.notes.value,
    };
  } else if (type === 'others') {
    data = {
      user_id: userId,
      [`${type}_date`]: form.date.value,
      description: form.description.value,
      intensity: form.level.value,
      notes: form.notes.value,
    };
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

    showToast('Tapahtuma päivitetty!');
    closeModal('editModal');
    calendar.refetchEvents();
  } catch (error) {
    if (error == 'jwt expired') {
      localStorage.clear();
      location.href='index.html';
      return;
    }
    showToast('Virhe päivitettäessä tapahtumaa: ' + error.message);
  }
}

async function handleDeleteEvent(calendar) {
  const form = document.getElementById('editEventForm');
  const id = form.event_id.value;
  const type = form.event_type.value;
  const eventId = id.split('_')[1];

  if (!eventId) {
    showToast('Tapahtuman ID on puutteellinen!');
    return;
  }

  const urlMap = {
    exercise: `http://localhost:3000/api/exercise/${eventId}`,
    sickness: `http://localhost:3000/api/sickness/${eventId}`,
    others: `http://localhost:3000/api/others/${eventId}`,
  };

  const isConfirmed = await customConfirm('Haluatko varmasti poistaa tämän työvuoron?');
  if (!isConfirmed) return;

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
      return;
    }

    if (response.error) throw new Error(response.error);

    showToast('Tapahtuma poistettu!');
    closeModal('editModal');
    calendar.refetchEvents();
  } catch (error) {
    showToast('Virhe poistettaessa tapahtumaa: ' + error.message);
  }
}
