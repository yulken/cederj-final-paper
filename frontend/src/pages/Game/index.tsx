import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Container, Content, GameData } from './styles';
import api from '../../services/apiClient';
import hedgehog from '../../assets/hedgehog.jpeg';

interface Game {
  id: string;
  name: string;
  price: number;
  publisher: string;
  release_date: Date;
  updated_at: Date;
  created_at: Date;
}

interface ParamsType {
  game_id: string;
}

const Store: React.FC = () => {
  const [game, setGame] = useState<Game>();
  const { game_id } = useParams<ParamsType>();
  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const response = await api.get(`games/${game_id}`);
      if (!game) {
        setGame(response.data);
      }
    };
    fetchGames();
  }, [game_id, game]);
  return (
    <Container>
      {game ? (
        <Content>
          <h1>{game.name}</h1>
          <img src={hedgehog} alt="" />
          <GameData>
            <tbody>
              <tr>
                <td>Preço</td>
                <td>{game.price}</td>
              </tr>
              <tr>
                <td>Editor</td>
                <td>{game.publisher}</td>
              </tr>
              <tr>
                <td>Data de Lançamento</td>
                <td>{format(new Date(game.release_date), 'dd/MM/yyyy')}</td>
              </tr>
            </tbody>
          </GameData>
        </Content>
      ) : (
        <Content />
      )}
    </Container>
  );
};
export default Store;
