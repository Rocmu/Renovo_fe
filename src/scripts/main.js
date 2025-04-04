import "../styles/main.css";
console.log("Tämä näkyy")

/** Function to handle the buttons on header & navigation */
document.querySelectorAll("button[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    switch (action) {
      case "return":
        window.location.href = "/index.html";
        break;
      case "home-page":
        window.location.href = "/elements.html";
        break;
      case "calendar":
        window.location.href = "/calendar.html";
        break;
      case "hrv":
        window.location.href = "/hrv.html";
        break;
      case "info":
        window.location.href = "/info.html";
        break;
    }
  });
});
