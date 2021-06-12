/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'https://docupet-39cff-default-rtdb.firebaseio.com/';

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

function createPet(petsObj) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/pets.json`, petsObj)
      .then((response) => {
        axios.patch(`${baseUrl}/pets/${response.data.name}.json`, { firebaseKey: response.data.name })
          .then((patchResponse) => {
            resolve(patchResponse);
          }).catch((error) => reject(error));
      });
  });
}

const updatePet = (petsObj) => new Promise((resolve, reject) => {
  console.log(petsObj);
  axios
    .patch(`${baseUrl}/pets/${petsObj.firebaseKey}.json`, petsObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const createPetProfile = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pets_documents.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pets_documents/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const deletePetProfile = (petsFirebaseKey) => axios.delete(`${baseUrl}/pets/${petsFirebaseKey}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pets_documents.json?orderBy="petsId"&equalTo="${petsFirebaseKey}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const petDocomentIdsArray = Object.keys(respArr);
          petDocomentIdsArray.forEach((id) => {
            deletePet(id);
          });
        });
      });
  });

const deletePet = (id) => axios.delete(`${baseUrl}/pets_documents/${id}.json`);

export default {
  getAllUserPets,
  getSinglePet,
  createPet,
  updatePet,
  createPetProfile,
  deletePet,
  deletePetProfile,
};
