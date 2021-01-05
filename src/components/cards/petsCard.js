import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import PetForm from '../forms/petForm';

export default class PetCards extends Component {
  render() {
    const { pet, removePet, onUpdate } = this.props;
    return (
      <div className='card m-3'>
        <img className='card-img-top pets-img' src={pet.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='d-flex justify-content-center'>{pet.name}</h5>
          <p className='d-flex justify-content-center'>{pet.description}</p>
          {/* <Link className='btn btn-primary' to={`/pet/${pet.firebaseKey}`}>
            View Documents
          </Link> */}
          <div className='d-flex justify-content-center'>
          <AppModal title={'Update Pet'} buttonLabel={'Update Pet'}>
            { Object.keys(pet).length && <PetForm onUpdate={onUpdate} pet={pet} />}
            </AppModal>
          <button className='btn btn-danger' id={pet.firebaseKey} onClick={(e) => removePet(e)}>Delete Pet</button>
          </div>
        </div>
      </div>
    );
  }
}
