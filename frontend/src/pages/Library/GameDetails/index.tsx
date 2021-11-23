import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Content } from './styles';
import api from '../../../services/apiClient';
import { TabMenu } from '../../../components';
import Game, { LibraryEntry } from '../../../components/Game';

interface ParamsType {
  game_id: string;
}

const Store: React.FC = () => {
  const [game, setGame] = useState<LibraryEntry>();
  const { game_id } = useParams<ParamsType>();
  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const gameResponse = await api.get(`library/${game_id}`);
      if (!game) {
        setGame(gameResponse.data);
      }
    };
    fetchGames();
  }, [game_id, game]);
  return (
    <Container>
      <TabMenu />
      {game ? (
        <Content>
          <Game
            id={game.id}
            price={game.price}
            name={game.name}
            publisher={game.publisher}
            release_date={game.release_date}
            bought_in={game.bought_in}
          />
        </Content>
      ) : (
        <Content />
      )}
    </Container>
  );
};
export default Store;
