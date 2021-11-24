import { getRepository, Repository } from 'typeorm';
import IOrderGamesRepository from '@modules/orders/repositories/IOrderGamesRepository';

import ICreateOrderGameDTO from '@modules/orders/dtos/ICreateOrderGameDTO';
import log from '@shared/utils/log';
import OrderGame from '../entities/OrderGame';

class OrderGamesRepository implements IOrderGamesRepository {
  private ormRepository: Repository<OrderGame>;

  constructor() {
    this.ormRepository = getRepository(OrderGame);
  }

  public async findByGameId(game_id: string): Promise<OrderGame[]> {
    log.debug('OrderGames :: findByGameId');
    return this.ormRepository.find({ where: { game_id } });
  }

  public async findByOrderId(order_id: string): Promise<OrderGame[]> {
    log.debug('OrderGames :: findByOrderId');
    return this.ormRepository.find({ where: { order_id } });
  }

  public async findById(id: string): Promise<OrderGame | undefined> {
    log.debug('OrderGames :: findById');
    return this.ormRepository.findOne(id);
  }

  public async create(userData: ICreateOrderGameDTO): Promise<OrderGame> {
    log.debug('OrderGames :: create');
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }
}

export default OrderGamesRepository;
