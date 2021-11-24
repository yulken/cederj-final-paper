import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import swagger from '../../swagger-config.json';
import './styles.css';
import 'swagger-ui-react/swagger-ui.css';

const Swagger: React.FC = () => (
  <div className="reset">
    <SwaggerUI spec={swagger} />;
  </div>
);

export default Swagger;
