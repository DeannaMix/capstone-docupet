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
          <h5 className='card-title'>{pet.name}</h5>
          <p className='card-text'>{pet.description}</p>
          <Link className='btn btn-primary' to={`/pets/${pet.firebaseKey}`}>
            View Documents
          </Link>
          <AppModal title={'Update Pet'} buttonLabel={'Update Pet'}>
            { Object.keys(pet).length && <PetForm pin={pet} onUpdate={onUpdate} pet={this.props.pet}/>}
            </AppModal>
          <button className='btn btn-danger' id={pet.firebaseKey} onClick={(e) => removePet(e)}>Delete Pet</button>
        </div>
      </div>
    );
  }
}
