import React, { Component } from 'react';
import DocumentsForm from '../forms/documentsForm';
import AppModal from '../AppModal';
import documentData from '../../helpers/data/documentData';

export default class DocumentsCard extends Component {
  render() {
    const { document, onUpdate, removeDocument } = this.props;
    console.log(document);
    return (
      <div className='card m-3 w-300'>
      <a href={document.url}>
        <img className='card-img-top document-img' src={document.imageUrl} alt='Card cap'></img>
      </a>
        <div className='card-body'>
          <h5 className='card-title'>{document.name}</h5>
          <p className='card-text'>{document.description}</p>
          {(this.props.isOnHome !== true) ? (
            <div className='d-flex justify-content-center'>
          <button className='btn btn-danger mr-1' id={document.firebaseKey} onClick={(e) => removeDocument(e)}>Delete Document</button>
          <AppModal title={'Update Document'} buttonLabel={'Update Document'}>
            { Object.keys(document).length && <DocumentsForm document={document} onUpdate={onUpdate} board={this.props.board} pets={this.props.pets} />}
            </AppModal>
          </div>
          ) : (
            <div></div>
          )
          }
        </div>
      </div>
    );
  }
}
