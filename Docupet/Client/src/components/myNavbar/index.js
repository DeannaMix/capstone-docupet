import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

export default function VerticalNavbar(props) {
  const signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const signIn = (e) => {
    console.warn('I am here');
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const { user } = props;

  return (
    <>
      <div className='my-nav'>
        <div className='nav-items'>
          <div className='nav-brand'>
          </div>
          <ul className='nav-links'>
            <li><Link to='/Home'><i className="fas fa-home icon"></i> Home</Link></li>
            <li><Link to='/petProfile'><i className="fas fa-dog icon"></i> Pet Profile</Link></li>
            <li><Link to='/Documents'><i className="fas fa-cat icon"></i> Your Documents</Link></li>
            <li><Link to='/Activities'><i className="fas fa-calendar-plus icon"></i> Build A Puppy Calender</Link></li>
          </ul>
        </div>
        <div className='nav-auth'>
          { user ? (
            <>
            <img className='user-img' src={user?.photoURL} alt={user?.displayName} />
            <div className='user-info'>
              <div>{user?.displayName}</div>
              <div className='sign-out btn' onClick={(e) => signOut(e)}>Sign Out</div>
            </div>
            </>) : (<div className='sign-in btn' onClick={(e) => signIn(e)}>Sign In</div>)
          }
        </div>
      </div>
      <div className='body'>
        {props.children}
      </div>
    </>
  );
}
