import { fetchData } from './fetch.js';
import { showToast } from './toast.js';
import { getCurrentCalendar } from './calendar-core.js';

export async function initializeEventHandlers(fetchInfo, successCallback, failureCallback) {
  try {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const [shifts, exercise, sickness, others] = await Promise.all([
      fetchData(`http://localhost:3000/api/shifts/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetchData(`http://localhost:3000/api/exercise/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetchData(`http://localhost:3000/api/sickness/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetchData(`http://localhost:3000/api/others/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const events = [
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

    successCallback(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    if (error == 'jwt expired') {
      localStorage.clear();
      location.href='index.html';
      return;
    }
    failureCallback(error);
  }
}

export function handleEventClick(info, calendar) {
  const event = info.event;
  const props = event.extendedProps;

  if (props.type === 'shift') {
    document.getElementById('editShiftModal').style.display = 'block';
    document.getElementById('editDate').value = event.startStr.split('T')[0];
    document.getElementById('editStartTime').value = event.startStr.split('T')[1].slice(0, 5);
    document.getElementById('editEndTime').value = event.endStr.split('T')[1].slice(0, 5);
    document.getElementById('eventId').value = props._id;
  } else {
    const modal = document.getElementById('editModal');
    const form = modal.querySelector('#editEventForm');

    const titleMap = {
      exercise: 'Muokkaa liikuntasuoritusta',
      sickness: 'Muokkaa sairastumista',
      others: 'Muokkaa muuta tapahtumaa'
    };
    modal.querySelector('h2').textContent = titleMap[props.type] || 'Muokkaa tapahtumaa';

    form.start_time.closest('label').style.display = 'none';
    form.end_time.closest('label').style.display = 'none';
    form.level.closest('label').style.display = 'none';

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
