import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListOrderGamesService from '@modules/orders/services/ListOrderGamesService';
import ShowOrderGamesService from '@modules/orders/services/ShowOrderGamesService';
import log from '@shared/utils/log';

export default class OrderGamesByOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;
    const listOrderGames = container.resolve(ListOrderGamesService);
    const game = await listOrderGames.execute({
      order_id,
    });

    return response.json(classToClass(game));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_game_id } = request.params;

    const showOrderGames = container.resolve(ShowOrderGamesService);

    const game = await showOrderGames.execute({ order_game_id });

    return response.json(classToClass(game));
  }
}
