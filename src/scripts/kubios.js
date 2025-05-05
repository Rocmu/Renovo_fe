import { fetchData } from './fetch';
import { drawChartTen, drawChartThirty } from './charts';

function tenActive() {
  const chooseTenBtn = document.querySelector('#print-hrv-ten-days');
  chooseTenBtn.addEventListener('mouseleave', () => {
    chooseTenBtn.style.backgroundColor = '#0046AD';
    chooseTenBtn.style.color = 'white';
  });

  const chooseThirtyBtn = document.querySelector('#print-hrv-thirty-days');
  chooseThirtyBtn.style.backgroundColor = 'lightgrey';
  chooseThirtyBtn.style.color = '#0046AD';

  chooseThirtyBtn.addEventListener('mouseenter', () => {
    chooseThirtyBtn.style.backgroundColor = '#0063F6';
    chooseThirtyBtn.style.color = 'white';
  });

  chooseThirtyBtn.addEventListener('mouseleave', () => {
    chooseThirtyBtn.style.backgroundColor = 'lightgrey';
    chooseThirtyBtn.style.color = '#0046AD';
  });
};

function thirtyActive() {
  const chooseThirtyBtn = document.querySelector('#print-hrv-thirty-days');
  chooseThirtyBtn.addEventListener('mouseleave', () => {
    chooseThirtyBtn.style.backgroundColor = '#0046AD';
    chooseThirtyBtn.style.color = 'white';
  });

  const chooseTenBtn = document.querySelector('#print-hrv-ten-days');
  chooseTenBtn.style.backgroundColor = 'lightgrey';
  chooseTenBtn.style.color = '#0046AD';

  chooseTenBtn.addEventListener('mouseenter', () => {
    chooseTenBtn.style.backgroundColor = '#0063F6';
    chooseTenBtn.style.color = 'white';
  });

  chooseTenBtn.addEventListener('mouseleave', () => {
    chooseTenBtn.style.backgroundColor = 'lightgrey';
    chooseTenBtn.style.color = '#0046AD';
  });
};

const getUserDataTen = async () => {
	console.log('Käyttäjän DATA Kubioksesta');

  tenActive();

	const url = 'http://localhost:3000/api/kubios/user-data-ten';
	const token = localStorage.getItem('token');
	const headers = { Authorization: `Bearer ${token}` };
	const options = {
		headers: headers,
	};
	const userData = await fetchData(url, options);

	if (userData.error) {
    if (userData.error == 'jwt expired') {
      localStorage.clear();
      location.href="index.html";
      return
    }
    console.log('Virhe: ' + userData.error);
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	drawChartTen(userData);
};

const getUserDataThirty = async () => {
	console.log('Käyttäjän DATA Kubioksesta');

  thirtyActive();

	const url = 'http://localhost:3000/api/kubios/user-data-thirty';
	const token = localStorage.getItem('token');
	const headers = { Authorization: `Bearer ${token}` };
	const options = {
		headers: headers,
	};
	const userData = await fetchData(url, options);

	if (userData.error) {
    if (userData.error == 'jwt expired') {
      localStorage.clear();
      location.href="index.html";
      return
    }
    console.log('Virhe: ' + userData.error);
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	drawChartThirty(userData);
};

export {getUserDataTen, getUserDataThirty};
