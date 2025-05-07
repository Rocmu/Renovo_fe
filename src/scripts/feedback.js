import { fetchData } from './fetch.js';
import { showToast } from './toast.js';

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

const registerFeedBack = async (event) => {
  event.preventDefault();

  //Get correct form
  const feedBackForm = document.querySelector('#feedback-form');

  //Ger values
  const notes = feedBackForm.querySelector('#feedback-text-id').value.trim();

  const user_id = localStorage.getItem('user_id')

  // Data for request
  const bodyData = {
      user_id: user_id,
      notes: notes,
  };

  // Endpoint
  const url = '/api/disagreement';

  let token = localStorage.getItem('token');

  // Options
  const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      },
  };

  // Send a request for posting data
  const response = await fetchData(url, options);

  if (response.error) {
      console.error('ADDING disagreement FAILED:', response.error);
      return;
    } else {
      const message = 'Palautteesi on tallennettu.'
      showToast(message)
    }

    feedBackForm.reset();
    getUserFeedback();
};

const getUserFeedback = async () => {

  closeFeedbackForm();
  displayFeedbackTable()

  let user_id = localStorage.getItem('user_id')

  const url = `/api/disagreement/user/${user_id}`;

  let token = localStorage.getItem('token');

  const options = {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
  };

  const response = await fetchData(url, options);

  const tableBody = document.querySelector('.tbody')

  tableBody.innerHTML = '';

  if (response.error) {
      tableBody.innerHTML = 'Palautteen haku epäonnistui.';
      return;
  }

  if (response.message) {
      console.log(response.message, 'success');
      return
  }

  response.reverse();

  if (response.length == 0) {
    tableBody.innerHTML = 'Et ole antanut palautetta.';
    return
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
