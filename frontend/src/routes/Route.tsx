import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProp,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import { useCart } from '../hooks/cart';

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
  const { cart, startCart } = useCart();
  if (user && !cart) {
    startCart;
  }
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
