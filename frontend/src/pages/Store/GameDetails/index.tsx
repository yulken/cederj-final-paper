import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Content } from './styles';
import api from '../../../services/apiClient';
import { TabMenu, Game } from '../../../components';
import { useCart } from '../../../hooks/cart';

interface GameDetails {
  id: string;
  name: string;
  price: number;
  publisher: string;
  release_date: Date;
}

interface ParamsType {
  game_id: string;
}

const Store: React.FC = () => {
  const [game, setGame] = useState<GameDetails>();
  const { game_id } = useParams<ParamsType>();
  const { addToCart, removeFromCart, cart } = useCart();

  const isGameFound = useCallback(
    (id: string): boolean => !!cart.games.find(elem => elem.id === id),
    [cart],
  );

  const [isOnCart, toggleCart] = useState<boolean>(false);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const response = await api.get(`games/${game_id}`);
      if (!game) {
        setGame(response.data);
      }
    };
    fetchGames();
  }, [game_id, game]);

  const add = useCallback(
    (idSubmit, priceSubmit, nameSubmit) => {
      addToCart({ id: idSubmit, price: priceSubmit, name: nameSubmit });
      toggleCart(isGameFound(idSubmit));
    },
    [addToCart, isGameFound],
  );

  const remove = useCallback(
    (idSubmit, priceSubmit, nameSubmit) => {
      removeFromCart({ id: idSubmit, price: priceSubmit, name: nameSubmit });
      toggleCart(isGameFound(idSubmit));
    },
    [removeFromCart, isGameFound],
  );

  useEffect(() => {
    if (game) {
      toggleCart(isGameFound(game.id));
    }
  }, [isGameFound, game]);

  return (
    <Container>
      <TabMenu nOfItems={cart.games.length} />
      {game ? (
        <Content>
          <Game
            id={game.id}
            name={game.name}
            publisher={game.publisher}
            release_date={game.release_date}
            price={game.price}
            isOnCart={isOnCart}
            func={isOnCart ? remove : add}
          />
        </Content>
      ) : (
        <Content />
      )}
    </Container>
  );
};
export default Store;
