import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';

import { v4 as uuidv4 } from 'uuid';
import Game from '@modules/games/infra/typeorm/entities/Game';

export default class FakeGamesRepository implements IGamesRepository {
  private games: Game[] = [];

  public async index(): Promise<Game[]> {
    return this.games;
  }

  public async findById(id: string): Promise<Game | undefined> {
    return this.games.find(game => game.id === id);
  }

  public async findByNameAndPublisherAndReleaseDate({
    name,
    publisher,
    release_date,
  }: ICreateGameDTO): Promise<Game | undefined> {
    return this.games.find(
      game => game.name === name && game.publisher === publisher,
    );
  }

  public async create(gameData: ICreateGameDTO): Promise<Game> {
    const game = new Game();
    Object.assign(game, { id: uuidv4() }, gameData);
    this.games.push(game);
    return game;
  }

  public async save(game: Game): Promise<Game> {
    const findIndex = this.games.findIndex(findGame => findGame.id === game.id);
    this.games[findIndex] = game;
    return game;
  }
}
