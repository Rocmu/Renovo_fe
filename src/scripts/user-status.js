import { fetchData } from './fetch';

const getUserStatus = async () => {

  let user_id = localStorage.getItem('user_id');

  const url = `https://thehyte.northeurope.cloudapp.azure.com/api/kubios/${user_id}`;

  let token = localStorage.getItem('token');

  const options = {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
  };

  const response = await fetchData(url, options);

  if (response.error) {
    if (userData.error == 'jwt expired') {
      localStorage.clear();
      location.href="https://thehyte.northeurope.cloudapp.azure.com/index.html";
      return
    }
      console.error('Error:', response.error);
      return;
  }

  if (response.message) {
      console.log(response.message);
  }

};

export {getUserStatus};
