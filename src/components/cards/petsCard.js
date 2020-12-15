import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PetCards extends Component {
  render() {
    const { pets, removePet } = this.props;
    return (
      <div className='card m-3'>
        <img className='card-img-top board-img' src={pets.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='card-title'>{pets.name}</h5>
          <p className='card-text'>{pets.description}</p>
          <Link className='btn btn-primary' to={`/pets/${pets.firebaseKey}`}>
            View Documents
          </Link>
          <button className='btn btn-danger' id={pets.firebaseKey} onClick={(e) => removePet(e)}>Delete Pet</button>
        </div>
      </div>
    );
  }
}
