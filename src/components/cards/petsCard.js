import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PetCards extends Component {
  render() {
    const { pet, removePet } = this.props;
    return (
      <div className='card m-3'>
        <img className='card-img-top pets-img' src={pet.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='card-title'>{pet.name}</h5>
          <p className='card-text'>{pet.description}</p>
          <Link className='btn btn-primary' to={`/pets/${pet.firebaseKey}`}>
            View Documents
          </Link>
          <button className='btn btn-danger' id={pet.firebaseKey} onClick={(e) => removePet(e)}>Delete Pet</button>
        </div>
      </div>
    );
  }
}
