import { fetchData } from './fetch';

const getUserStatus = async () => {

  let user_id = localStorage.getItem('user_id');

  const url = `http://localhost:3000/api/kubios/${user_id}`;

  let token = localStorage.getItem('token');

  const options = {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
  };

  const response = await fetchData(url, options);

  if (response.error) {
    if (response.error == 'jwt expired') {
      localStorage.clear();
      location.href="index.html";
      return
    }
      console.error('Error:', response.error);
      return;
  }

  if (response.message) {
      console.log('Renovo App');
  }

};

export {getUserStatus};
