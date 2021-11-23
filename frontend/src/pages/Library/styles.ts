import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${appearFromTop} 0.5s;

  width: 100%;
  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }

  * {
    margin-bottom: 10px;
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
