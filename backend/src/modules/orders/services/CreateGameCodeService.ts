import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4, validate } from 'uuid';

import AppError from '@shared/errors/AppError';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import IGamestoreCodesRepository from '../repositories/IGamestoreCodeRepository';
import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';
import AbstractCodeTemplate from './AbstractCodeTemplate';

interface IRequest {
  game_id: string;
}

@injectable()
export default class CreateGameCodeService extends AbstractCodeTemplate {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,

    @inject('GamestoreCodesRepository')
    private gamestoreCodesRepository: IGamestoreCodesRepository,
  ) {
    super();
  }

  protected async createCode({ game_id }: IRequest): Promise<GamestoreCode> {
    const code = await this.gamestoreCodesRepository.create({
      code: uuidv4(),
      is_redeemed: false,
      product: {
        game: game_id,
      },
    } as GamestoreCode);
    return code;
  }

  protected async validateData({ game_id }: IRequest): Promise<void> {
    if (!validate(game_id) || !(await this.gamesRepository.findById(game_id))) {
      throw new AppError('Game does not exist');
    }
  }
}
