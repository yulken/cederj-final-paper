import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import IGamestoreCodesRepository from '../repositories/IGamestoreCodeRepository';
import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';

interface IRequest {
  game_id: string;
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,

    @inject('GamestoreRepository')
    private gamestoreRepository: IGamestoreCodesRepository,
  ) {}

  public async execute({ game_id }: IRequest): Promise<GamestoreCode> {
    if (!(await this.gamesRepository.findById(game_id))) {
      throw new AppError('Game does not exist');
    }

    const code = await this.gamestoreRepository.create({
      code: uuidv4(),
      is_redeemed: false,
      json: {
        game: game_id,
      },
    } as GamestoreCode);
    return code;
  }
}
