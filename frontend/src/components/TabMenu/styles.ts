import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #312e38;
  position: absolute;
`;

export const LinkLists = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  place-content: center;
  justify-content: space-between;
  margin: 0 auto;
  text-transform: uppercase;
  width: 50%;
  a {
    color: #bb86fc;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#bb86fc')};
    }
  }
`;

export const UserInfo = styled.div`
  width: 20%;
  align-items: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #bb86fc;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#bb86fc')};
    }
  }
`;
