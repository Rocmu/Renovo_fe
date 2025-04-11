const logout = async (event) => {
  event.preventDefault();
  localStorage.clear();
  location.href="index.html";
}

export {logout};
