import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Test from '../pages/Test';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Test} />
  </Switch>
);

export default Routes;
