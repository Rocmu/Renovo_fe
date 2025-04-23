function newFunction() {
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

// Reveal hidden text boxes for readiness, rmssd, sns, pns
function revealTextOne(event) {
  event.preventDefault();
  const infoOne = document.querySelector('.hrv-results-container-footer');
  infoOne.style.display = 'flex';
  const windowWidth = window.innerWidth;

  //Katsotaan selaimen koko
  if (windowWidth >= 1200) {
    console.log('leveys' + windowWidth)
    const firstCanvas = document.querySelector('.canvas-wrapper')
    firstCanvas.scrollIntoView();
  } else {
    console.log('leveys' + windowWidth)
    infoOne.scrollIntoView();
  }
}

// Reveal hidden text boxes for physiological age and bpm
function revealTextTwo(event) {
  event.preventDefault();
  const infoTwo = document.querySelector('.hrv-results-container-footer-2');
  infoTwo.style.display = 'flex';
  const windowWidth = window.innerWidth;

  //Katsotaan selaimen koko
  if (windowWidth >= 1200) {
    console.log('leveys' + windowWidth)
    const secondCanvas = document.querySelector('.canvas-wrapper-2')
    secondCanvas.scrollIntoView();
  } else {
    console.log('leveys' + windowWidth)
    infoTwo.scrollIntoView();
  }
}

export {newFunction, revealTextOne, revealTextTwo}
