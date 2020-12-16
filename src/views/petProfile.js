import React, { Component } from 'react';
import petData from '../helpers/data/petData';
import petsCard from '../components/cards/petsCard';
import getUid from '../helpers/data/authData';
import Loader from '../components/Loader';
import petForm from '../components/forms/petForm';
import AppModal from '../components/AppModal';

export default class Pets extends Component {
  state = {
    pets: [],
    loading: true,
  };

  componentDidMount() {
    this.getPets();
  }

  getPets = () => {
    const uid = getUid();
    petData.getAllUserPets(uid).then((response) => {
      this.setState({
        pets: response,
        loading: false,
      });
    });
  };

  removePet = (e) => {
    const removedPet = this.state.pets.filter(
      (pets) => pets.firebaseKey !== e.target.id,
    );
    this.setState({
      pets: removedPet,
    });
    petData.deletePet(e.target.id).then(() => {
      this.getPets();
    });
  };

  render() {
    const { pets, loading } = this.state;
    const showPets = () => pets.map((pet) => (
        <petsCard
          key={pets.firebaseKey}
          board={pets}
          removeBoard={this.removeBoard}
        />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <AppModal title={'Create Pet'} buttonLabel={'Create Pet'} buttonColor={'primary'}>
              <petForm onUpdate={this.getPets} />
            </AppModal>
            <h2>All Pets</h2>
            <div className='d-flex flex-wrap justify-content-center'>
              {showPets()}
            </div>
          </>
        )}
      </>
    );
  }
}
