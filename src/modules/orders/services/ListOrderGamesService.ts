import { injectable, inject } from 'tsyringe';
import OrderGame from '../infra/typeorm/entities/OrderGame';

import IOrderGamesRepository from '../repositories/IOrderGamesRepository';

interface IRequest {
  order_id: string;
}

@injectable()
export default class ListOrderGamesService {
  constructor(
    @inject('OrderGamesRepository')
    private orderGamesRepository: IOrderGamesRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<OrderGame[]> {
    const orders = await this.orderGamesRepository.findByOrderId(order_id);
    return orders;
  }
}
