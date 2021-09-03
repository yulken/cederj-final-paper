import Game from '@modules/games/infra/typeorm/entities/Game';
import { injectable, inject } from 'tsyringe';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import ILibrariesRepository from '../repositories/ILibrariesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListOwnedGamesService {
  constructor(
    @inject('LibrariesRepository')
    private librariesRepository: ILibrariesRepository,
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Game[]> {
    const libraries = await this.librariesRepository.findByUserId(user_id);
    const promises = libraries.map(library => {
      return this.gamesRepository.findById(library.game_id);
    });
    const games = await Promise.all(promises);
    const filteredGames = games.filter(game => game !== undefined) as Game[];
    return filteredGames;
  }
}
