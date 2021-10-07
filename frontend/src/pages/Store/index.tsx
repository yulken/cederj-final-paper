import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Gallery, Card } from './styles';
import api from '../../services/apiClient';
import hedgehog from '../../assets/hedgehog.jpeg';

interface Game {
  id: string;
  name: string;
  price: number;
  publisher: string;
  release_date: Date;
}

const Store: React.FC = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const response = await api.get('games/');
      setGames(response.data);
    };
    fetchGames();
  }, []);
  return (
    <Container>
      <Content>
        <h1>Lista de Jogos</h1>
        <Gallery>
          {games.map((game: Game) => (
            <Link key={game.id} to={`games/${game.id}`}>
              <Card>
                <img src={hedgehog} alt="" />
                {game.name}
              </Card>
            </Link>
          ))}
        </Gallery>
        <Link to="/signin">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
    </Container>
  );
};
export default Store;
