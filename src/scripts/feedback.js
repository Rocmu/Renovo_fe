import { fetchData } from './fetch.js';

function displayFeedbackForm() {
  const form = document.querySelector('.feedback-form-container');
  form.style.display = 'block';
}

function closeFeedbackForm() {
  const form = document.querySelector('.feedback-form-container');
  form.style.display = 'none';
}

function displayFeedbackTable() {
  const form = document.querySelector('.feedback-table');
  form.style.display = 'block';
}

function closeFeedbackTable() {
  const form = document.querySelector('.feedback-table');
  form.style.display = 'none';
}

const registerFeedBack = async (event) => {
  event.preventDefault();

  //GET CORRECT FORM
  const feedBackForm = document.querySelector('#feedback-form');

  //GET VALUES
  const notes = feedBackForm.querySelector('#feedback-text-id').value.trim();

  const user_id = localStorage.getItem('user_id')

  // ENTRY DATA FOR REQUEST
  const bodyData = {
      user_id: user_id,
      notes: notes,
  };

  // ENDPOINT
  const url = 'https://thehyte.northeurope.cloudapp.azure.com/api/disagreement';

  let token = localStorage.getItem('token');

  // OPTIONS
  const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      },
  };

  // SEND REQUEST FOR POSTING DATA
  const response = await fetchData(url, options);

  if (response.error) {
      console.error('ADDING disagreement FAILED:', response.error);
      return;
    } else {
      alert('Tallennettu.')
    }

    feedBackForm.reset();
    getUserFeedback();
};

const getUserFeedback = async () => {

  closeFeedbackForm();
  displayFeedbackTable()

  let user_id = localStorage.getItem('user_id')

  const url = `https://thehyte.northeurope.cloudapp.azure.com/api/disagreement/user/${user_id}`;

  let token = localStorage.getItem('token');

  const options = {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
  };

  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
      console.error('Error getting data:', response.error);
      return;
  }

  if (response.message) {
      console.log(response.message, 'success');
  }

  console.log(response);

  const tableBody = document.querySelector('.tbody')

  tableBody.innerHTML = '';

  response.reverse();

  console.log('Tämän pitunen' + response.length)

  if (response.length == 0) {
    tableBody.innerHTML = 'Et ole antanut palautetta.';
  }

  let nro = response.length
  response.forEach((res) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${nro}</td>
          <td>${new Date(res.created_at).toLocaleDateString("fi-FI")}</td>
          <td>${res.notes}</td>
          `;

      tableBody.appendChild(row);
      nro -= 1;
      });
  };

export {displayFeedbackForm, registerFeedBack, getUserFeedback};
