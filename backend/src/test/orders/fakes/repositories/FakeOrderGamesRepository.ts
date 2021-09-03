import IOrderGamessRepository from '@modules/orders/repositories/IOrderGamesRepository';
import ICreateOrderGamesDTO from '@modules/orders/dtos/ICreateOrderGameDTO';

import { v4 as uuidv4 } from 'uuid';
import OrderGames from '@modules/orders/infra/typeorm/entities/OrderGame';

export default class FakeOrderGamesRepository
  implements IOrderGamessRepository
{
  private orderGames: OrderGames[] = [];

  public async findByGameId(game_id: string): Promise<OrderGames[]> {
    return this.orderGames.filter(orderGame => orderGame.game_id === game_id);
  }

  public async findByOrderId(order_id: string): Promise<OrderGames[]> {
    return this.orderGames.filter(orderGame => orderGame.order_id === order_id);
  }

  public async findById(id: string): Promise<OrderGames | undefined> {
    return this.orderGames.find(orderGame => orderGame.id === id);
  }

  public async create(
    orderGameData: ICreateOrderGamesDTO,
  ): Promise<OrderGames> {
    const orderGame = new OrderGames();
    Object.assign(orderGame, { id: uuidv4() }, orderGameData);
    this.orderGames.push(orderGame);
    return orderGame;
  }
}
