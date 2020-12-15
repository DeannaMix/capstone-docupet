import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import documentData from '../../helpers/data/documentData';
import petData from '../../helpers/data/petData';

export default class DocumentForm extends Component {
  state = {
    firebaseKey: this.props.document?.firebaseKey || '',
    name: this.props.document?.name || '',
    imageUrl: this.props.document?.imageUrl || '',
    UserId: this.props.document?.UserId || '',
    description: this.props.document?.description || '',
    documents: [],
    success: false,
  };

  documentsRef = React.createRef();

  componentDidMount() {
    const UserId = getUser();
    this.getPets(UserId).then((response) => {
      this.setState({
        UserId,
        pets: response,
      });
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

    if (this.state.firebaseKey === '') {
      const newDocument = {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        firebaseKey: this.state.firebaseKey,
        UserId: this.state.UserId,
      };
      documentData.createDocument(newDocument).then((response) => {
        const petsDocument = {
          petsId: this.petsRef.current.value,
          documentId: response.data.firebaseKey,
          userId: this.state.UserId,
        };
        petData.createPetProfile(petsDocument);
      }).then(() => {
        this.props.onUpdate?.(this.props.petsId);
        this.setState({
          success: true,
        });
      });
    } else {
      documentData.getPetProfileToDelete(this.state.firebaseKey);
      const updatedDocument = {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        firebaseKey: this.state.firebaseKey,
        UserId: this.state.UserId,
      };
      documentData.updateDocument(updatedDocument).then(() => {
        const updatedPetProfile = {
          petsId: this.petsRef.current.value,
          documentId: this.state.firebaseKey,
          userId: this.state.UserId,
        };
        petData.createPetProfile(updatedPetProfile);
        this.props.onUpdate?.(this.props.document.firebaseKey);
        this.setState({
          success: true,
        });
      });
    }
  };

  getPets = (uid) => petData.getAllUserPets(uid).then((response) => response)

  render() {
    const {
      name, petName, description, imageUrl,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {(this.state.success === true) ? (
          <div class="alert alert-success" role="alert">Your Document Was Successfully Updated!</div>
        ) : (
          <div></div>
        )}
        <input
          type='text'
          name='name'
          value={name}
          onChange={this.handleChange}
          placeholder='Document Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={description}
          onChange={this.handleChange}
          placeholder='Document Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an image URL or upload a file'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <p className='mt-2'>Select A Pet</p>
        <select ref={this.petsRef} className='form-control form-control-md mb-2'>
            {Object.keys(petName).length && petName.map((pets) => (
              <option key={pets.firebaseKey} value={pets.firebaseKey}>{pets.name}</option>
            ))}
        </select>
        <button className='btn btn-success'>Submit</button>
      </form>
    );
  }
}
