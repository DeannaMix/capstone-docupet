import axios from 'axios';

const baseUrl = 'https://docupet-39cff-default-rtdb.firebaseio.com/';

const addDocumentToPet = (documentToPetObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pets_document.json`, documentToPetObject).then((response) => {
    axios.patch(`${baseUrl}/pets_documents/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
  }).catch((error) => reject(error));
});

const deleteDocumentFromPet = (documentFirebaseKey) => (
  axios.get(`${baseUrl}/pets_document.json?orderBy="documentId"&equalTo="${documentFirebaseKey}"`).then((response) => {
    axios.delete(`${baseUrl}/pets_document/${Object.keys(response.data)[0]}.json`);
  })
);

const deletePet = (petsFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pets_document.json?orderBy="petsId"&equalTo="${petsFirebaseKey}"`).then((response) => {
    Object.keys(response.data).forEach((documentPetsKey) => {
      axios.delete(`${baseUrl}/pets_document/${documentPetsKey}.json`);
    });
  }).then(resolve).catch((error) => reject(error));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addDocumentToPet,
  deleteDocumentFromPet,
  deletePet,
};
