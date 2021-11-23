import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Container, Content, Gallery, Card } from './styles';
import { TabMenu } from '../../components';
import api from '../../services/apiClient';
import hedgehog from '../../assets/hedgehog.jpeg';

export interface GameDetails {
  id: string;
  name: string;
  price: number;
  publisher: string;
  release_date: Date;
  bought_in: Date;
}

const Library: React.FC = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const response = await api.get('library');
      setGames(response.data);
    };
    fetchGames();
  }, []);
  return (
    <Container>
      <TabMenu />
      <Content>
        <h1>Sua Biblioteca</h1>
        <Gallery>
          {games.length > 0
            ? games.map((game: GameDetails) => (
                <Link key={game.id} to={`library/${game.id}`}>
                  <Card>
                    <img src={hedgehog} alt="" />
                    {game.name}
                  </Card>
                </Link>
              ))
            : 'Sua Bilioteca está vazia'}
        </Gallery>
      </Content>
    </Container>
  );
};
export default Library;
