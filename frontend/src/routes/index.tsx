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
  History,
  Swagger,
} from '../pages';
import LibraryGameDetails from '../pages/Library/GameDetails';
import StoreGameDetails from '../pages/Store/GameDetails';
import Order from '../pages/History/Order';

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
    <Route path="/history" exact component={History} isPrivate />
    <Route path="/history/:order_id" exact component={Order} isPrivate />
    <Route path="/admin/swagger" exact component={Swagger} />
  </Switch>
);

export default Routes;
