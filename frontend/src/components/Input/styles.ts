import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
      transition: border-color 0.3s;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #bb86fc;
      border-color: #bb86fc;
      transition: color 0.3s;
      transition: border-color 0.3s;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #bb86fc;
      transition: color 0.3s;
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
