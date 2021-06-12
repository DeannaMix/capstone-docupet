import React from 'react';
import documentData from '../helpers/data/documentData';
import petData from '../helpers/data/petData';
import DocumentsCard from '../components/cards/documentCard';
import getUid from '../helpers/data/authData';
import Loader from '../components/Loader';
import DocumentForm from '../components/forms/documentsForm';
import AppModal from '../components/AppModal';

export default class Documents extends React.Component {
  state = {
    documents: [],
    pets: [],
    loading: true,
  }

  componentDidMount() {
    this.getDocuments();
    this.getPets();
  }

  getDocuments = () => {
    const uid = getUid();
    documentData.getAllPetDocuments(uid).then((response) => {
      this.setState({
        documents: response,
        loading: false,
      });
    });
  }

  getPets = () => {
    const uid = getUid();
    petData.getAllUserPets(uid).then((response) => {
      this.setState({
        pets: response,
        loading: false,
      });
    });
  }

  removeDocument = (e) => {
    console.log(e.target.id);
    const removedDocument = this.state.documents.filter(
      (documents) => document.firebaseKey !== e.target.id,
    );
    this.setState({
      documents: removedDocument,
    });
    documentData.deleteDocument(e.target.id).then(() => {
      this.getDocuments();
    });
  }

  render() {
    const { documents, loading, pets } = this.state;
    const showDocuments = () => documents.map((document) => (
      <DocumentsCard
        onUpdate={this.getDocuments}
        pets={pets}
        key={document.firebaseKey}
        document={document}
        removeDocument={this.removeDocument}
      />
    ));
    return (
      <>
      { loading ? (
        <Loader />
      ) : (
        <>
          <AppModal title={'Create Document'} buttonLabel={'Create Document'} buttonColor={'primary'}>
            <DocumentForm onUpdate={this.getDocuments} document={this.state.document} pets={pets} />
          </AppModal>
          <h1 className='d-flex flex-wrap justify-content-center' id='document-title'>All documents</h1>
          <div className='d-flex flex-wrap justify-content-center'>
            {showDocuments()}
          </div>
        </>
      )}
      </>
    );
  }
}
