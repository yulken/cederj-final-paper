import log from '@shared/utils/log';
import { injectable, inject } from 'tsyringe';
import Game from '../infra/typeorm/entities/Game';

import IGamesRepository from '../repositories/IGamesRepository';

@injectable()
export default class IndexGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(): Promise<Game[]> {
    log.debug('Index Game :: ');
    const games = await this.gamesRepository.index();
    return games;
  }
}
