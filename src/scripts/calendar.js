import "../styles/main.css";
import "../styles/calendar.css";

document.addEventListener('DOMContentLoaded', function() {
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

    // Muotoillaan kuukauden nimi isolla alkukirjaimella
    titleFormat: { year: 'numeric', month: 'long' },
    titleFormatter: function(date) {
      const monthName = date.toLocaleString('fi-FI', { month: 'long' });
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      const year = date.getFullYear();
      return capitalizedMonth + ' ' + year;
    },

    // Muotoillaan viikonpäivät isolla alkukirjaimella
    dayHeaderContent: function(arg) {
      const dayName = arg.text.charAt(0).toUpperCase() + arg.text.slice(1);
      return { html: '<span>' + dayName + '</span>' };
    },

    // Lisätään luokat viikonpäiville värejä varten
    dayHeaderClassNames: function(arg) {
      return ['custom-day-header', 'fc-day-' + arg.date.getDay()];
    },

    dayCellDidMount: function(info) {
      const today = new Date();
      if (
        info.date.getFullYear() === today.getFullYear() &&
        info.date.getMonth() === today.getMonth() &&
        info.date.getDate() === today.getDate()
      ) {
        info.el.classList.add('today');
      }
    }
  });
  calendar.render();

  // Työvuoromodaalin käsittely
  const shiftModal = document.getElementById('shiftModal');
  const formTable = document.querySelector('.form-shift-table');

  function generateDaysOfMonth() {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    formTable.innerHTML = '<div class="form-shift-header"><span>alkaa:</span><span>päättyy:</span></div>';

    for (let i = 1; i <= daysInMonth; i++) {
      const row = document.createElement('div');
      row.className = 'form-row';
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

  // Lomakkeiden lähetyslogiikka
  document.getElementById('shiftForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Työvuorot tallennettu!");
    closeModal('shiftModal');
  });

  ['exerciseForm', 'sicknessForm', 'othersForm'].forEach(formId => {
    document.getElementById(formId).addEventListener('submit', function(e) {
      e.preventDefault();
      alert("Tieto tallennettu!");
      closeModal(this.closest('.calendar-modal').id);
    });
  });

  // sulkemisfunktio kaikille modaaleille
  window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
  };

  // Klikkaus modalin ulkopuolelle sulkee modaalin
  window.onclick = function(event) {
    if (event.target.classList.contains('calendar-modal')) {
      closeModal(event.target.id);
    }
  };
});
