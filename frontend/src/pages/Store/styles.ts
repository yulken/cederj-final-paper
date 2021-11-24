import styled, { css, keyframes } from 'styled-components';

interface CardProps {
  status?: 'enabled' | 'disabled';
}

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
  margin: auto;
  place-content: center;
  animation: ${appearFromTop} 0.5s;

  width: 70%;
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
  flex-wrap: wrap;

  justify-content: space-between
  width: 100%;
  gap: 30px;

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }

  > div {
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }
`;

const cardVariations = {
  enabled: css`
    opacity: 1;
  `,
  disabled: css`
    opacity: 0.5;
  `,
};

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 200px;
    width: 150px;
    object-fit: cover;
  }
  > div {
    overflow-wrap: break-word;
    align-items: center;
  }
  ${props => cardVariations[props.status || 'enabled']}
`;
