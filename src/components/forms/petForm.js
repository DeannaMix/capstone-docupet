import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import petData from '../../helpers/data/petData';

export default class PetForm extends Component {
  state = {
    firebaseKey: this.props.pet?.firebaseKey || '',
    name: this.props.pet?.name || '',
    imageUrl: this.props.pet?.imageUrl || '',
    userId: this.props.pet?.userId || '',
    description: this.props.pet?.description || '',
  };

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `docupet/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.pet) {
      console.log('Update');
      petData.updatePet(this.state).then(() => {
        this.props.onUpdate(this.props.pet.firebaseKey);
      });
    } else {
      console.log('Create');
      petData.createPet(this.state).then(() => {
        this.props.onUpdate();
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Pet Creation Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pet Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pet Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an image URL or upload a file'
          className='form-control form-control-lg m-1'
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}
