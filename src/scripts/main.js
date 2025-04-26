import "../styles/main.css";
import { logout } from "./log-out.js";
import { mobNav } from "./mob-nav.js";
import { goBackToTop } from "./back-to-top.js";

const exitAccountMob = document.querySelector('#log-out-user');
exitAccountMob.addEventListener('click', logout);

document.querySelector('#show-username-header').innerHTML = `${localStorage.getItem('nimi')}`;

const getMobNav = document.querySelector('#mob-nav');
getMobNav.addEventListener('click', mobNav);

goBackToTop();
