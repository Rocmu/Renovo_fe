import "../styles/index.css";
import { fetchData } from './fetch.js';

const loginUser = async (event) => {
	event.preventDefault();

	// Get the correct form
	const loginForm = document.querySelector('#login-form');

	// Get values from form, this time using attribute selectors
	const username = loginForm.querySelector('input[type=text]').value;
	const password = loginForm.querySelector('input[type=password]').value;

	// Create a body for server request
	const bodyData = {
		username: username,
		password: password,
	};

	// Endpoint
	const url = 'http://localhost:3000/api/auth/kubios-login';

	// Options
	const options = {
		body: JSON.stringify(bodyData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	};

	// Get data
	const response = await fetchData(url, options);

	if (response.error) {
    const errorMessage = document.querySelector('#login-valid-confirm');
    errorMessage.innerHTML = 'Sisäänkirjautuminen epäonnistui. Väärä käyttäjänimi/salasana.';
		console.error('Error adding a new user:', response.error);
		return;
	}

	if (response.message) {
    const successMessage = document.querySelector('#login-valid-confirm');
    successMessage.innerHTML = '';
		console.log(response.message, 'success');
		localStorage.setItem('token', response.token);
    localStorage.setItem('nimi', response.user);
    localStorage.setItem('user_id', response.user_id);
		location.href = 'home.html';
	}

	console.log(response);
	loginForm.reset();
};

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', loginUser);
