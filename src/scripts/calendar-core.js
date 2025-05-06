import '../styles/main.css';
import '../styles/calendar.css';
import { showToast } from './toast.js';
import { customConfirm } from './toast.js';
import { fetchData } from './fetch.js';
import { initializeEventHandlers } from './calendar-events.js';
import { handleEventClick } from './calendar-events.js';
import { initializeFormHandlers } from './calendar-forms.js';
import { initializeModalHandlers } from './calendar-modals.js';
import { initializeInfoHandlers } from './calendar-info.js';

// Global variable to store current calendar instance
export let currentCalendar = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize FullCalendar
  const calendarEl = document.getElementById('calendarView');
  const calendar = new FullCalendar.Calendar(calendarEl, {
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

  // Store and render calendar
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
    const start = parseInt(startTime.slice(0, 2))
    const end = parseInt(endTime.slice(0, 2))
    const difference = start - end

    // Create html element for shift, additional class if a night shift
    if (difference >= 0) {
      return {
        html: `
          <div class="custom-shift-event" id="night-shift">
            <div class="shift-time">🌙 ${startTime} - ${endTime}</div>
          </div>
        `,
      };
    } else {
      return {
        html: `
          <div class="custom-shift-event">
            <div class="shift-time">☀️ ${startTime} - ${endTime}</div>
          </div>
        `,
      };
    }

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
