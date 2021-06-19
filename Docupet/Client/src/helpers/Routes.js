import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../views/Home';
import Documents from '../views/Documents';
import PetProfile from '../views/petProfile';
import Activities from '../views/Activities';
import NotFound from '../views/NotFound';
import { ActivityProvider } from './data/calander';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path='/Home' component={() => <Home user={user}/>}/>
      <Route exact path='/petProfile' component={() => <PetProfile user={user}/>}/>
      <Route exact path='/Documents' component={() => <Documents user={user}/>}/>
      <ActivityProvider>
         <Route path='/Activities' component={() => <Activities user={user}/> }/>
      </ActivityProvider>
      <Route component={NotFound}/>
    </Switch>
  );
}
