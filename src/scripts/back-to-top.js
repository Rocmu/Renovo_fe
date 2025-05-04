function goBackToTop() {
  const mybutton = document.getElementById("backTopBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  mybutton.addEventListener('click', topFunction);
}

// Toggle hidden text boxes for readiness, rmssd, sns, pns
function toggleTextOne(event) {
  event.preventDefault();
  const infoOne = document.querySelector('.hrv-results-container-footer');
  const buttonOne = document.querySelector('#canvas-one-text-boxes'); // <- haetaan nappi
  const windowWidth = window.innerWidth;

  if (infoOne.style.display === 'flex') {
    // Hide with animation
    infoOne.style.animation = 'disappear 1s ease-out forwards';
    buttonOne.textContent = 'Mitä arvot tarkoittavat?';
    setTimeout(() => {
      infoOne.style.display = 'none';
    }, 1000);
  } else {
    // Display with animation
    infoOne.style.display = 'flex';
    infoOne.style.animation = 'appear 1s ease-out forwards';
    buttonOne.textContent = 'Piilota';
    if (windowWidth >= 1200) {
      const firstCanvas = document.querySelector('.canvas-wrapper');
      firstCanvas.scrollIntoView({ behavior: 'smooth' });
    } else {
      infoOne.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Toggle hidden text boxes for physiological age and bpm
function toggleTextTwo(event) {
  event.preventDefault();
  const infoTwo = document.querySelector('.hrv-results-container-footer-2');
  const buttonTwo = document.querySelector('#canvas-two-text-boxes'); // <- haetaan nappi
  const windowWidth = window.innerWidth;

  if (infoTwo.style.display === 'flex') {
    // Hide with animation
    infoTwo.style.animation = 'disappear 1s ease-out forwards';
    buttonTwo.textContent = 'Mitä arvot tarkoittavat?';
    setTimeout(() => {
      infoTwo.style.display = 'none';
    }, 1000);
  } else {
    // Display with animations
    infoTwo.style.display = 'flex';
    infoTwo.style.animation = 'appear 1s ease-out forwards';
    buttonTwo.textContent = 'Piilota';
    if (windowWidth >= 1200) {
      const secondCanvas = document.querySelector('.canvas-wrapper-2');
      secondCanvas.scrollIntoView({ behavior: 'smooth' });
    } else {
      infoTwo.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export {goBackToTop, toggleTextOne, toggleTextTwo}
