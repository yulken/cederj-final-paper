import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }
`;

export const Gallery = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between
  width: 100%;
  gap: 30px;

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 200px;
    width: 150px;
    object-fit: cover;
  }
`;
