import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: 'green' | 'red' | 'default';
}

const buttonColorVariations = {
  default: css`
    background: #bb86fc;
    color: #312e38;
    &:hover {
      background: ${shade(0.2, '#bb86fc')};
    }
  `,
  green: css`
    background: #2ecc71;
    color: #f4ede8;
    &:hover {
      background: ${shade(0.2, '#27ae60')};
    }
  `,
  red: css`
    background: #ff7979;
    color: #f4ede8;
    &:hover {
      background: ${shade(0.2, '#eb4d4b')};
    }
  `,
};

export const Container = styled.button<ContainerProps>`
  background: #bb86fc;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  margin-top: 8px;
  transition: background-color 0.2s;
  ${props => buttonColorVariations[props.color || 'default']}
`;
