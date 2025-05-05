import { getCurrentCalendar } from './calendar-core.js';

export function initializeModalHandlers(calendar) {
  // Modal opening login
  document.getElementById('openShiftModal').addEventListener('click', () => {
    generateDaysOfMonth(calendar);
    document.getElementById('shiftModal').style.display = 'block';
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

  // Modal closing function
  window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';

    // Reset all forms once the modal closes
    document.getElementById("shiftForm").reset();
    document.getElementById("exerciseForm").reset();
    document.getElementById("sicknessForm").reset();
    document.getElementById("othersForm").reset();
    document.getElementById("editShiftForm").reset();
    document.getElementById("editEventForm").reset();
  };
}

function generateDaysOfMonth(calendar) {
  const calendarDate = calendar.getDate();
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const formTable = document.querySelector(".form-shift-table");

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  formTable.innerHTML = '<div class="form-shift-header"><span>Aloitus aika:</span><span>Lopetus aika:</span></div>';

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
