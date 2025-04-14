import { fetchData } from './fetch';
import { drawChartTen, drawChartThirty } from './charts';
import { logout } from './log-out.js';

const getUserDataTen = async () => {
	console.log('Käyttäjän DATA Kubioksesta');

	const url = 'http://localhost:3000/api/kubios/user-data-ten';
	const token = localStorage.getItem('token');
	const headers = { Authorization: `Bearer ${token}` };
	const options = {
		headers: headers,
	};
	const userData = await fetchData(url, options);

	if (userData.error) {
    console.log('Virhe: ' + userData.error);
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	drawChartTen(userData);
};

const getUserDataThirty = async () => {
	console.log('Käyttäjän DATA Kubioksesta');

	const url = 'http://localhost:3000/api/kubios/user-data-thirty';
	const token = localStorage.getItem('token');
	const headers = { Authorization: `Bearer ${token}` };
	const options = {
		headers: headers,
	};
	const userData = await fetchData(url, options);

	if (userData.error) {
    console.log('Virhe: ' + userData.error);
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	drawChartThirty(userData);
};

export {getUserDataTen, getUserDataThirty};
