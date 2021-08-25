import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateGameService from '@modules/games/services/CreateGameService';
import ShowGameService from '@modules/games/services/ShowGameService';
import UpdateGameService from '@modules/games/services/UpdateGameService';
import IndexGameService from '@modules/games/services/IndexGameService';

export default class GamesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexGame = container.resolve(IndexGameService);
    const games = await indexGame.execute();

    return response.json(games);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, developer, publisher, release_date } = request.body;
    const createGame = container.resolve(CreateGameService);
    const game = await createGame.execute({
      name,
      price,
      developer,
      publisher,
      release_date,
    });

    return response.json(classToClass(game));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;
    const showGame = container.resolve(ShowGameService);

    const game = await showGame.execute({ game_id });

    return response.json(classToClass(game));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;
    const { price, release_date } = request.body;

    const updateGame = container.resolve(UpdateGameService);

    const game = await updateGame.execute({
      game_id,
      price,
      release_date,
    });
    return response.json(classToClass(game));
  }
}
