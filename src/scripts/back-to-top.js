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

export {newFunction}
