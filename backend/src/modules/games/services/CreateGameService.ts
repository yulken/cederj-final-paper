import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import log from '@shared/utils/log';
import Game from '../infra/typeorm/entities/Game';
import IGamesRepository from '../repositories/IGamesRepository';
import ICreateGameDTO from '../dtos/ICreateGameDTO';

@injectable()
export default class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({
    name,
    price,
    publisher,
    release_date,
  }: ICreateGameDTO): Promise<Game> {
    log.debug(
      'Create Game :: ',
      JSON.stringify({ name, price, publisher, release_date }),
    );
    const checkGame =
      await this.gamesRepository.findByNameAndPublisherAndReleaseDate({
        name,
        publisher,
        release_date,
      });
    if (checkGame) {
      throw new AppError('Game Already registered');
    }
    const game = await this.gamesRepository.create({
      name,
      price,
      publisher,
      release_date,
    });

    return game;
  }
}
