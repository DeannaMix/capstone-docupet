/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'https://react-pinterest-106f8.firebaseio.com/';

const getAllUserPets = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pets.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getSinglePet = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pets/${firebaseKey}.json`).then((response) => {
      resolve(response.data);
    });
});

function createPet(boardObj) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/pets.json`, boardObj)
      .then((response) => {
        axios.patch(`${baseUrl}/pets/${response.data.name}.json`, { firebaseKey: response.data.name })
          .then((patchResponse) => {
            resolve(patchResponse);
          }).catch((error) => reject(error));
      });
  });
}

const updatePet = (boardObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/pets/${boardObj.firebaseKey}.json`, boardObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const createPetProfile = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pets-documents.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pets-documents/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const deletePetProfile = (boardFirebaseKey) => axios.delete(`${baseUrl}/pets/${boardFirebaseKey}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pets-documents.json?orderBy="petsId"&equalTo="${boardFirebaseKey}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const petDocomentIdsArray = Object.keys(respArr);
          petDocomentIdsArray.forEach((id) => {
            deletePetProfile(id);
          });
        });
      });
  });

const deletePet = (id) => axios.delete(`${baseUrl}/pets-documents/${id}.json`);

export default {
  getAllUserPets,
  getSinglePet,
  createPet,
  updatePet,
  createPetProfile,
  deletePet,
  deletePetProfile,
};
