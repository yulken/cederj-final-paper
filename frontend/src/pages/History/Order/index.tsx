import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Content, GameData } from './styles';
import { TabMenu } from '../../../components';
import api from '../../../services/apiClient';

interface OrderGame {
  name: string;
  price: string;
}

interface ParamsType {
  order_id: string;
}

const Order: React.FC = () => {
  const { order_id } = useParams<ParamsType>();
  const [orderItemList, setOrderItemList] = useState<OrderGame[]>([]);

  useEffect(() => {
    const fetchOrder = async (): Promise<void> => {
      const response = await api.get(`orders/${order_id}`);
      setOrderItemList(response.data.games);
    };
    fetchOrder();
  }, [order_id]);

  return (
    <Container>
      <TabMenu />
      <Content>
        <h1>Seu Pedido</h1>
        <GameData>
          <tbody>
            <tr>
              <td>Nome do Item</td>
              <td>Valor do item</td>
              <td />
            </tr>
            {orderItemList.map(elem => (
              <tr>
                <td>{elem.name}</td>
                <td>{elem.price}</td>
              </tr>
            ))}
          </tbody>
        </GameData>
      </Content>
    </Container>
  );
};
export default Order;
