import '../styles/hrv.css';
import { getUserDataTen, getUserDataThirty } from "./kubios.js";

const printTenResults = document.querySelector('#print-hrv-ten-days');
printTenResults.addEventListener('click', getUserDataTen);

const printThirtyResults = document.querySelector('#print-hrv-thirty-days');
printThirtyResults.addEventListener('click', getUserDataThirty);

getUserDataTen();
