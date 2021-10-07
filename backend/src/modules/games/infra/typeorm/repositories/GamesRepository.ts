import { getRepository, Repository } from 'typeorm';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';

import log from '@shared/utils/log';
import Game from '../entities/Game';

class GamesRepository implements IGamesRepository {
  private ormRepository: Repository<Game>;

  constructor() {
    this.ormRepository = getRepository(Game);
  }

  public async findByNameAndPublisherAndReleaseDate({
    name,
    publisher,
    release_date,
  }: ICreateGameDTO): Promise<Game | undefined> {
    log.debug('Games :: findByNameAndPublisherAndReleaseDate');
    return this.ormRepository.findOne({
      where: { name, publisher, release_date },
    });
  }

  public async index(): Promise<Game[]> {
    log.debug('Games :: index');
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Game | undefined> {
    log.debug('Games :: findById');
    return this.ormRepository.findOne(id);
  }

  public async create(gameData: ICreateGameDTO): Promise<Game> {
    log.debug('Games :: create');
    const game = this.ormRepository.create(gameData);
    await this.ormRepository.save(game);
    return game;
  }

  public async save(game: Game): Promise<Game> {
    log.debug('Games :: save');
    return this.ormRepository.save(game);
  }
}

export default GamesRepository;
