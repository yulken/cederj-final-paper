import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOwnedGamesService from '@modules/users/services/ListLibraryItemsService';
import ShowLibraryItem from '@modules/users/services/ShowLibraryItem';

export default class LibraryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLibrary = container.resolve(ListOwnedGamesService);

    const user_id = request.user.id;
    const games = await listLibrary.execute({ user_id });

    return response.json(games);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showLibrary = container.resolve(ShowLibraryItem);
    const { game_id } = request.params;
    const user_id = request.user.id;
    const games = await showLibrary.execute({ user_id, game_id });

    return response.json(games);
  }
}
