import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProp,
  // Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProp {
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return <Component />;
      }}
    />
  );
};

export default Route;
