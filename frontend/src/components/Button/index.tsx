import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'red' | 'default';
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => (
  <Container color={color || 'default'} type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
