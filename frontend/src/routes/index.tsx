import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
// import Test from '../pages/Test';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Store from '../pages/Store';
import Game from '../pages/Game';

const Routes: React.FC = () => (
  <Switch>
    {/* <Route path="/" exact component={Test} isPrivate /> */}
    <Route path="/" exact component={Store} />
    <Route path="/games/:game_id" exact component={Game} />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
  </Switch>
);

export default Routes;
