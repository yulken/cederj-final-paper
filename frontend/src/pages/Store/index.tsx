import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Container, Content, Gallery, Card } from './styles';
import { GameDetails } from '../Library';
import TabMenu from '../../components/TabMenu';
import api from '../../services/apiClient';
import hedgehog from '../../assets/hedgehog.jpg';

interface Game {
  id: string;
  name: string;
  price: number;
  publisher: string;
  release_date: Date;
}

const Store: React.FC = () => {
  const [games, setGames] = useState([]);
  const [ownedGames, setOwnedGames] = useState<GameDetails[]>([]);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const response = await api.get('games/');
      setGames(response.data);
    };
    const fetchOwnedGames = async (): Promise<void> => {
      const response = await api.get('library');
      setOwnedGames(response.data);
    };
    fetchGames();
    fetchOwnedGames();
  }, []);
  return (
    <Container>
      <TabMenu />
      <Content>
        <h1>Lista de Jogos</h1>
        <Gallery>
          {games.map((game: Game) =>
            ownedGames.every(elem => elem.id !== game.id) ? (
              <Link key={game.id} to={`games/${game.id}`}>
                <Card status="enabled">
                  <img src={hedgehog} alt="" />
                  <div>{game.name}</div>
                </Card>
              </Link>
            ) : (
              <Card status="disabled">
                <img src={hedgehog} alt="" />
                <div>{game.name}</div>
              </Card>
            ),
          )}
        </Gallery>
      </Content>
    </Container>
  );
};
export default Store;
