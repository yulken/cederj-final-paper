import Game from '@modules/games/infra/typeorm/entities/Game';
import { injectable, inject } from 'tsyringe';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import ILibrariesRepository from '../repositories/ILibrariesRepository';

interface IRequest {
  user_id: string;
}

interface ILibraryItem extends Game {
  bought_in: Date;
}
@injectable()
export default class ListOwnedGamesService {
  constructor(
    @inject('LibrariesRepository')
    private librariesRepository: ILibrariesRepository,
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<ILibraryItem[]> {
    const libraries = await this.librariesRepository.findByUserId(user_id);
    const games = await Promise.all(
      libraries.map(async library => ({
        ...(await this.gamesRepository.findById(library.game_id)),
        bought_in: library.created_at,
      })),
    );

    const filteredGames = games.filter(
      game => game !== undefined,
    ) as ILibraryItem[];
    return filteredGames;
  }
}
