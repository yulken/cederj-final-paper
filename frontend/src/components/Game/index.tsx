import React from 'react';
import { format } from 'date-fns';
import { Form } from '@unform/web';
import { Content, GameData } from './styles';
import hedgehog from '../../assets/hedgehog.jpeg';
import Button from '../Button';

export interface LibraryEntry {
  id: string;
  name: string;
  publisher: string;
  release_date: Date;
  price: number;
  bought_in?: Date;
  isOnCart?: boolean;
  func?(id: string, price: number, name: string): void;
}

const Game: React.FC<LibraryEntry> = ({
  id,
  name,
  publisher,
  release_date,
  price,
  bought_in,
  isOnCart,
  func,
}) => {
  return (
    <Content>
      <h1>{name}</h1>
      <img src={hedgehog} alt="" />
      <GameData>
        <tbody>
          <tr>
            <td>Editor</td>
            <td>{publisher}</td>
          </tr>
          {!bought_in && (
            <tr>
              <td>Preço</td>
              <td>{price}</td>
            </tr>
          )}
          <tr>
            <td>Data de Lançamento</td>
            <td>{format(new Date(release_date), 'dd/MM/yyyy')}</td>
          </tr>
          {bought_in && (
            <tr>
              <td>Adquirido em</td>
              <td>{format(new Date(bought_in), 'dd/MM/yyyy')}</td>
            </tr>
          )}
          {func &&
            (isOnCart ? (
              <tr>
                <td colSpan={2}>
                  <Form onSubmit={() => func(id, price, name)}>
                    <Button color="red" type="submit">
                      Remover do Carrinho
                    </Button>
                  </Form>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2}>
                  <Form onSubmit={() => func(id, price, name)}>
                    <Button color="green" type="submit">
                      Adicionar ao Carrinho
                    </Button>
                  </Form>
                </td>
              </tr>
            ))}
        </tbody>
      </GameData>
    </Content>
  );
};
export default Game;
