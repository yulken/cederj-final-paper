import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILibrariesRepository from '@modules/users/repositories/ILibrariesRepository';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderGamesRepository from '../repositories/IOrderGamesRepository';
import OrderGame from '../infra/typeorm/entities/OrderGame';

interface IRequest {
  user_id: string;
  order_games: OrderGame[];
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LibrariesRepository')
    private librariesRepository: ILibrariesRepository,

    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,

    @inject('OrderGamesRepository')
    private orderGamesRepository: IOrderGamesRepository,
  ) {}

  public async execute({ user_id, order_games }: IRequest): Promise<Order> {
    if (!(await this.usersRepository.findById(user_id))) {
      throw new AppError('User does not exist');
    }
    let totalPrice = 0;
    await Promise.all(
      order_games.map(async item => {
        const library = await this.librariesRepository.findByUserIdAndGameId({
          game_id: item.game_id,
          user_id,
        });
        if (library.length > 0) {
          throw new AppError('User already has this game');
        }
        if (!(await this.gamesRepository.findById(item.game_id))) {
          throw new AppError('Game does not exist');
        }
        totalPrice += item.price;
        return;
      }),
    );

    const order = await this.ordersRepository.create({
      total_price: totalPrice,
      user_id,
    });

    await Promise.all(
      order_games.map(item => {
        this.orderGamesRepository.create({
          game_id: item.game_id,
          order_id: order.id,
          price: item.price,
        });
        return this.librariesRepository.create({
          game_id: item.game_id,
          user_id,
        });
      }),
    );

    return order;
  }
}
