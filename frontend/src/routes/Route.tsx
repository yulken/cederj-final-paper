import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProp,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProp {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        if (isPrivate && !user) {
          return <Redirect to={{ pathname: '/signin' }} />;
        }
        return <Component />;
      }}
    />
  );
};

export default Route;
