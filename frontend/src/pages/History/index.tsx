import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Container, Content, GameData } from './styles';
import { TabMenu } from '../../components';
import api from '../../services/apiClient';

interface OrderList {
  id: string;
  user_id: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
}

const History: React.FC = () => {
  const [orderList, setOrderList] = useState<OrderList[]>([]);

  useEffect(() => {
    const fetchOrder = async (): Promise<void> => {
      const response = await api.get('orders');
      setOrderList(response.data);
    };
    fetchOrder();
  }, []);

  return (
    <Container>
      <TabMenu />
      <Content>
        <h1>Histórico</h1>
        {orderList.length > 0 ? (
          <GameData>
            <tbody>
              <tr>
                <td>Data da compra</td>
                <td>Valor do pedido</td>
                <td />
              </tr>
              {orderList.map(({ id, created_at, total_price }) => (
                <tr key={id}>
                  <td>{format(new Date(created_at), 'dd/MM/yyyy')}</td>
                  <td>{total_price}</td>
                  <td>
                    <Link to={`history/${id}`}>Ver detalhes</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </GameData>
        ) : (
          'Você não tem um histórico de compras'
        )}
      </Content>
    </Container>
  );
};
export default History;
