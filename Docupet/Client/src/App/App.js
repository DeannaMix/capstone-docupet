import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import VerticalNavbar from '../components/myNavbar';
import fbConnection from '../helpers/data/connections';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <VerticalNavbar user={user}>
          <Routes user={user}/>
        </VerticalNavbar>
      </Router>
    );
  }
}

export default App;
