import Game from '@modules/games/infra/typeorm/entities/Game';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import AppError from '@shared/errors/AppError';
import log from '@shared/utils/log';
import { injectable, inject } from 'tsyringe';
import OrderGame from '../infra/typeorm/entities/OrderGame';
import IOrderGamesRepository from '../repositories/IOrderGamesRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
}

interface IOrderDetails {
  id: string;
  user_id: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  order_details: OrderGame[];
  games: Game[];
}

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('OrderGamesRepository')
    private orderGamesRepository: IOrderGamesRepository,

    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<IOrderDetails> {
    log.debug(`ShowOrderService :: ${order_id}`);
    const order = await this.ordersRepository.findById(order_id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    const orderDetails = await this.orderGamesRepository.findByOrderId(
      order_id,
    );
    const games = await Promise.all(
      orderDetails.map(
        ({ game_id }) =>
          this.gamesRepository.findById(game_id) as Promise<Game>,
      ),
    );

    return {
      ...order,
      order_details: orderDetails,
      games,
    };
  }
}
