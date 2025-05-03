import '../styles/main.css';
import '../styles/calendar.css';
import { showToast } from './toast.js';
import { fetchData } from './fetch.js';
import { initializeEventHandlers } from './calendar-events.js';
import { handleEventClick } from './calendar-events.js';
import { initializeFormHandlers } from './calendar-forms.js';
import { initializeModalHandlers } from './calendar-modals.js';
import { initializeInfoHandlers } from './calendar-info.js';

// GLOBAL VARIABLE TO STORE CURRENT CALENDAR INSTANCE
export let currentCalendar = null;

// INITIALIZE WHEN DOM IS LOADED
document.addEventListener('DOMContentLoaded', function () {
  // INITIALIZE FULLCALENDAR
  const calendarEl = document.getElementById('calendarView');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    timeZone: 'local',
    locale: 'fi',
    firstDay: 1, // MONDAY AS FIRST DAY OF WEEK
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    titleFormat: { year: 'numeric', month: 'long' },
    eventClassNames: function(arg) {
      return arg.event.extendedProps.type + '-event';
    },
    events: async function(fetchInfo, successCallback, failureCallback) {
      await initializeEventHandlers(fetchInfo, successCallback, failureCallback);
    },
    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
      info.el.title = 'Klikkaa muokataksesi';
    },
    eventClick: function(info) {
      handleEventClick(info, calendar);
    },
    eventContent: renderEventContent
  });

  // STORE AND RENDER CALENDAR
  currentCalendar = calendar;
  calendar.render();
  calendar.refetchEvents();

  // Initialize all handlers
  initializeFormHandlers(calendar);
  initializeModalHandlers(calendar);
  initializeInfoHandlers();
});

// Event content rendering
function renderEventContent(arg) {
  const { event } = arg;
  const props = event.extendedProps;

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

// Export for other modules
export function getCurrentCalendar() {
  return currentCalendar;
}
