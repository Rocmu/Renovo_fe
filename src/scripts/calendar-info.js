export function initializeInfoHandlers() {
  const infoBtnOne = document.querySelector('#event-instructions');
  infoBtnOne.addEventListener('click', toggleInfo);
}

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
