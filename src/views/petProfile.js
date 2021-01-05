import React, { Component } from 'react';
import petData from '../helpers/data/petData';
import PetsCard from '../components/cards/petsCard';
import getUid from '../helpers/data/authData';
import Loader from '../components/Loader';
import PetForm from '../components/forms/petForm';
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
    petData.deletePetProfile(e.target.id).then(() => {
      this.getPets();
    });
  };

  render() {
    const { pets, loading } = this.state;
    const showPets = () => pets.map((pet) => (
        <PetsCard
          key={pet.firebaseKey}
          pet={pet}
          removePet={this.removePet}
          onUpdate={this.getPets}
        />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <AppModal title={'Create Pet'} buttonLabel={'Create Pet'} buttonColor={'primary'} className='create' id='create'>
              <PetForm onUpdate={this.getPets} />
            </AppModal>
            <h2 className='d-flex flex-wrap justify-content-center'>All Pets</h2>
            <div className='d-flex flex-wrap justify-content-center'>
              {showPets()}
            </div>
          </>
        )}
      </>
    );
  }
}
