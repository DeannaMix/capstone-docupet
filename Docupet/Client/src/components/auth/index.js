import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends Component {
  signIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <button className='sign-in-btn' onClick={(e) => this.signIn(e)}>Sign In to Get Started</button>
    );
  }
}

export default Auth;
