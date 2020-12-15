import axios from 'axios';
import petData from './petData';

const baseUrl = 'https://docupet-39cff-default-rtdb.firebaseio.com/';

const getPetDocuments = (petsId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pets-documents.json?orderBy="petsId"&equalTo="${petsId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getDocument = (documentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/document/${documentId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllPetDocuments = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/document.json?orderBy="UserId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const createDocument = (documentObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/document.json`, documentObj)
    .then((response) => {
      axios.patch(`${baseUrl}/documemnt/${response.data.name}.json`, { firebaseKey: response.data.name }).then((patchResponse) => {
        resolve(patchResponse);
      }).catch((error) => reject(error));
    });
});

const getPublicDocuments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/document.json?orderBy="private"&equalTo="false"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

// const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const deleteDocument = (documentId) => axios.delete(`${baseUrl}/document/${documentId}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pets-documents.json?orderBy="documentId"&equalTo="${documentId}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const petDocumentIdsArray = Object.keys(respArr);
          petDocumentIdsArray.forEach((id) => {
            petData.deletePetProfilet(id);
          });
        });
      });
  });

const updateDocument = (documentObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/document/${documentObj.firebaseKey}.json`, documentObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const getPetProfileToDelete = (documentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pets-document.json?orderBy="documentId"&equalTo="${documentId}"`)
    .then((response) => {
      const responseArray = Object.values(response);
      responseArray.forEach((respArr) => {
        const pinBoardIdsArray = Object.keys(respArr);
        pinBoardIdsArray.forEach((id) => {
          petData.deletePetProfile(id);
        });
      });
    });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPetDocuments,
  getDocument,
  getAllPetDocuments,
  createDocument,
  getPublicDocuments,
  deleteDocument,
  updateDocument,
  getPetProfileToDelete,
};
