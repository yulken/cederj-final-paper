import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import {
  SignIn,
  SignUp,
  Profile,
  Store,
  Library,
  RedeemCode,
  Cart,
} from '../pages';
import LibraryGameDetails from '../pages/Library/GameDetails';
import StoreGameDetails from '../pages/Store/GameDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Store} />
    <Route path="/games/:game_id" exact component={StoreGameDetails} />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/library" exact component={Library} isPrivate />
    <Route
      path="/library/:game_id"
      exact
      component={LibraryGameDetails}
      isPrivate
    />
    <Route path="/redeem-code" exact component={RedeemCode} isPrivate />
    <Route path="/cart" exact component={Cart} isPrivate />
  </Switch>
);

export default Routes;
