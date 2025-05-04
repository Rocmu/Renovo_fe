import '../styles/hrv.css';
import { getUserDataTen, getUserDataThirty } from "./kubios.js";
import { displayFeedbackForm, registerFeedBack, getUserFeedback } from './feedback.js';
import { goBackToTop, toggleTextOne, toggleTextTwo } from './back-to-top.js';

const printTenResults = document.querySelector('#print-hrv-ten-days');
printTenResults.addEventListener('click', getUserDataTen);

const printThirtyResults = document.querySelector('#print-hrv-thirty-days');
printThirtyResults.addEventListener('click', getUserDataThirty);

//Open first info-box
const infoBtnOne = document.querySelector('#canvas-one-text-boxes');
infoBtnOne.addEventListener('click', toggleTextOne);

//Open second info-box
const infoBtnTwo = document.querySelector('#canvas-two-text-boxes');
infoBtnTwo.addEventListener('click', toggleTextTwo);

getUserDataTen();

const openFeedbackFormBtn = document.querySelector('#open-feedback-form');
openFeedbackFormBtn.addEventListener('click', displayFeedbackForm);

// Save new feedback
const postFeedbackBtn = document.querySelector('#post-feedback');
postFeedbackBtn.addEventListener('click', registerFeedBack);

// Fetch all feedback
const getFeedbackBtn = document.querySelector('#view-prev-feedback');
getFeedbackBtn.addEventListener('click', getUserFeedback);

goBackToTop();
