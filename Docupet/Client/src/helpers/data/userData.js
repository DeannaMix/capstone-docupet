import axios from 'axios';

const baseUrl = 'https://docupet-39cff-default-rtdb.firebaseio.com/';

const checkIfUserExistsInFirebase = (user) => {
  axios
    .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios
          .post(`${baseUrl}/users.json`, user)
          .then((response) => {
            const update = { firebaseKey: response.data.name };
            axios.patch(`${baseUrl}/users/${response.data.name}.json`, update);
          })
          .catch((error) => console.warn(error));
      } else {
        console.warn('User Already Exists');
      }
      window.sessionStorage.setItem('ua', true);
    })
    .catch((error) => console.error(error));
};

const setCurrentUser = (userObj) => {
  const user = {
    uid: userObj.uid,
    name: userObj.displayName,
    email: userObj.email,
  };
  const loggedIn = window.sessionStorage.getItem('ua');
  if (!loggedIn) {
    checkIfUserExistsInFirebase(user);
  }
  return user;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { setCurrentUser };
