import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateGameService from '@modules/games/services/CreateGameService';
import ShowGameService from '@modules/games/services/ShowGameService';

interface IGameId extends Request {
  query: {
    game_id: string;
  };
}

export default class GamesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, developer, publisher, releaseDate } = request.body;
    const createGame = container.resolve(CreateGameService);
    const game = await createGame.execute({
      name,
      price,
      developer,
      publisher,
      releaseDate,
    });

    return response.json(classToClass(game));
  }

  public async show(request: IGameId, response: Response): Promise<Response> {
    const { game_id } = request.params;
    const showGame = container.resolve(ShowGameService);

    const game = await showGame.execute({ game_id });

    return response.json(classToClass(game));
  }
}
