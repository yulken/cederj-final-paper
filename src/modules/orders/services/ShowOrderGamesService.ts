import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import OrderGame from '../infra/typeorm/entities/OrderGame';

import IOrderGamesRepository from '../repositories/IOrderGamesRepository';

interface IRequest {
  order_game_id: string;
}

@injectable()
export default class ShowOrderGamesService {
  constructor(
    @inject('OrderGamesRepository')
    private orderGamesRepository: IOrderGamesRepository,
  ) {}

  public async execute({ order_game_id }: IRequest): Promise<OrderGame> {
    const orderGame = await this.orderGamesRepository.findById(order_game_id);
    if (!orderGame) {
      throw new AppError('Could not find order item');
    }
    return orderGame;
  }
}
