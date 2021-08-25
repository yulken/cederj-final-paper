import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Game from '../infra/typeorm/entities/Game';

import IGamesRepository from '../repositories/IGamesRepository';

interface IRequest {
  game_id: string;
  price?: number;
  release_date?: Date;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({
    game_id,
    price,
    release_date,
  }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(game_id);
    if (!game) {
      throw new AppError('Game not found', 404);
    }
    if (price) {
      if (price < 0) {
        throw new AppError("Price can't be lesser than 0");
      }
      Object.assign(game, { price });
    }
    if (release_date) {
      const now = Date.now();
      if (game.release_date.getTime() < now) {
        throw new AppError("Can't update if game is already release");
      }

      if (now > new Date(release_date).getTime()) {
        throw new AppError("New Release Date can't be in the past", 400);
      }

      Object.assign(game, { release_date });
    }
    return this.gamesRepository.save(game);
  }
}
