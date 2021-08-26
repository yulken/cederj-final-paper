import ICreateOrderGameDTO from '../dtos/ICreateOrderGameDTO';
import OrderGame from '../infra/typeorm/entities/OrderGame';

export default interface IOrderGamesRepository {
  findById(id: string): Promise<OrderGame | undefined>;
  findByGameId(game_id: string): Promise<OrderGame[]>;
  findByOrderId(order_id: string): Promise<OrderGame[]>;
  create(data: ICreateOrderGameDTO): Promise<OrderGame>;
}
