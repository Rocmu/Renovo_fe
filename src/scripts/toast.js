
export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

export function customConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('customConfirmModal');
    const messageElement = document.getElementById('confirmMessage');
    const yesButton = document.getElementById('confirmYes');
    const noButton = document.getElementById('confirmNo');

    messageElement.textContent = message;
    modal.style.display = 'block';

    yesButton.onclick = () => {
      modal.style.display = 'none';
      resolve(true);
    };

    noButton.onclick = () => {
      modal.style.display = 'none';
      resolve(false);
    };
  });
}
