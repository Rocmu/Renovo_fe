import '../styles/hrv.css';
import { getUserDataTen, getUserDataThirty } from "./kubios.js";
import { displayFeedbackForm, registerFeedBack, getUserFeedback } from './feedback.js';
import { newFunction, revealTextOne } from './back-to-top.js';

const printTenResults = document.querySelector('#print-hrv-ten-days');
printTenResults.addEventListener('click', getUserDataTen);

const printThirtyResults = document.querySelector('#print-hrv-thirty-days');
printThirtyResults.addEventListener('click', getUserDataThirty);

//Avaa ensimmäinen info-laatikko
const infoBtnOne = document.querySelector('#canvas-one-text-boxes');
infoBtnOne.addEventListener('click', revealTextOne);

getUserDataTen();

const openFeedbackFormBtn = document.querySelector('#open-feedback-form');
openFeedbackFormBtn.addEventListener('click', displayFeedbackForm);

// Tallenna uusi palaute
const postFeedbackBtn = document.querySelector('#post-feedback');
postFeedbackBtn.addEventListener('click', registerFeedBack);

// hae kaikki palautteet
const getFeedbackBtn = document.querySelector('#view-prev-feedback');
getFeedbackBtn.addEventListener('click', getUserFeedback);

newFunction();
