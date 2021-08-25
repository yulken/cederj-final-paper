import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Game from '../infra/typeorm/entities/Game';

import IGamesRepository from '../repositories/IGamesRepository';

interface IRequest {
  game_id: string;
}

@injectable()
export default class ShowGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ game_id }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(game_id);
    if (!game) {
      throw new AppError('Game not found', 404);
    }
    return game;
  }
}
