import "../styles/main.css";
import { logout } from "./log-out.js";

const exitAccountMob = document.querySelector('#log-out-user');
exitAccountMob.addEventListener('click', logout);
