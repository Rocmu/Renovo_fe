import "../styles/main.css";
import { logout } from "./log-out.js";

const exitAccountMob = document.querySelector('#log-out-user');
exitAccountMob.addEventListener('click', logout);

document.querySelector('#show-username-header').innerHTML = `${localStorage.getItem('nimi')}`;
