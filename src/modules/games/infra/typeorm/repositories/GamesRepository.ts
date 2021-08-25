import { getRepository, Repository } from 'typeorm';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';

import Game from '../entities/Game';

class GamesRepository implements IGamesRepository {
  private ormRepository: Repository<Game>;

  constructor() {
    this.ormRepository = getRepository(Game);
  }

  public async findById(id: string): Promise<Game | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async create(gameData: ICreateGameDTO): Promise<Game> {
    const game = this.ormRepository.create(gameData);
    await this.ormRepository.save(game);
    return game;
  }

  public async save(game: Game): Promise<Game> {
    return this.ormRepository.save(game);
  }
}

export default GamesRepository;
