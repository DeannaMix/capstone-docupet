import React from 'react';
import Loader from '../components/Loader';
import Auth from '../components/auth';
import getUid from '../helpers/data/authData';
import DocumentsCard from '../components/cards/documentCard';
import documentData from '../helpers/data/documentData';

export default class Home extends React.Component {
  state = {
    documents: [],
    loading: true,
    user: '',
  }

  componentDidMount() {
    console.warn("I'm in home .js");
    this.getDocuments();
    const userID = getUid();
    this.setState({
      user: userID,
    });
  }

  getDocuments = () => {
    documentData.getPublicDocuments().then((response) => {
      this.setState({
        documents: response,
        loading: false,
      });
    });
  }

  render() {
    const { documents, user } = this.state;
    const loadComponent = () => {
      let component = '';
      if (user === null) {
        component = <Loader />;
      } else if (user) {
        component = documents.map((document) => (
          <DocumentsCard key={document.firebaseKey} document={document} isOnHome={true} />
        ));
      } else {
        component = <Auth />;
      }
      return component;
    };
    return (
      <div>
        <h1 className='d-flex flex-wrap justify-content-center'>Welcome to Docupet!</h1>
        <h2 className='d-flex flex-wrap justify-content-center'> Begin by creating a pet profile!</h2>
        <div className='d-flex flex-wrap justify-content-center'>
        {loadComponent()}
        </div>
      </div>
    );
  }
}
