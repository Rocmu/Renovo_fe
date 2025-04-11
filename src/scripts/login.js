import "../styles/index.css";
import { fetchData } from './fetch.js';

const loginUser = async (event) => {
	event.preventDefault();

	// Haetaan oikea formi
	const loginForm = document.querySelector('#login-form');

	// Haetaan formista arvot, tällä kertaa käyttäen attribuuutti selektoreita
	const username = loginForm.querySelector('input[type=text]').value;
	const password = loginForm.querySelector('input[type=password]').value;

	// Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
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
	console.log(options);

	// Hae data
	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error adding a new user:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
		localStorage.setItem('token', response.token);
		localStorage.setItem('nimi', response.user.email);
    localStorage.setItem('user_id', response.user_id);
		location.href = 'home.html';
	}

	console.log(response);
	loginForm.reset();
};

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', loginUser);
