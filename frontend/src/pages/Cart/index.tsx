import React, { useCallback, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Content, GameData } from './styles';
import { useCart, Game } from '../../hooks/cart';
import { Button, TabMenu } from '../../components';
import api from '../../services/apiClient';
import { useAuth, User } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, startCart } = useCart();
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();
  const [totalPrice, setTotalPrice] = useState<number>(cart.total_price);
  const [gameList, setGameList] = useState<Game[]>(cart.games);
  const handleClick = useCallback(
    (id, price: number) => {
      const game = {
        id,
        price,
      } as Game;
      removeFromCart(game);
      setGameList(cart.games);
      setTotalPrice(totalPrice - price);
    },
    [removeFromCart, setTotalPrice, totalPrice, cart],
  );

  const handleConfirm = useCallback(
    async (list: Game[]) => {
      try {
        if (user.balance < totalPrice) {
          throw new Error('cod:saldo');
        }

        await api.post('orders', {
          user_id: user.id,
          order_games: list,
        });
        const gotUser = await api.get(`profile/${user.id}`);

        updateUser(gotUser.data as User);
        history.push('/library');
        addToast({
          type: 'success',
          title: 'Compra Realizado!',
          description: 'Compra realizada com sucesso',
        });
        startCart();
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'cod:saldo')
            addToast({
              type: 'error',
              title: 'Saldo Insuficiente',
              description: 'Saldo insuficiente para compra.',
            });
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro Interno',
          description: 'Ocorreu um erro interno.',
        });
      }
    },
    [
      totalPrice,
      user.balance,
      user.id,
      updateUser,
      history,
      addToast,
      startCart,
    ],
  );
  return (
    <Container>
      <TabMenu nOfItems={gameList.length} />
      <Content>
        <h1>Carrinho</h1>
        <GameData>
          <tbody>
            {gameList.map(({ id, name, price }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <Button
                    color="red"
                    type="submit"
                    onClick={() => handleClick(id, price)}
                  >
                    <FiXCircle />
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>
                {gameList.length > 0 ? (
                  <Button
                    color="green"
                    type="submit"
                    onClick={() => handleConfirm(gameList)}
                  >
                    Efetuar Compra ({totalPrice} Créditos)
                  </Button>
                ) : (
                  'Seu Carrinho está vazio'
                )}
              </td>
            </tr>
          </tbody>
        </GameData>
      </Content>
    </Container>
  );
};
export default Cart;
