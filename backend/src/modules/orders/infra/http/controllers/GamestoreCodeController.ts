import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCashCodeService from '@modules/orders/services/CreateCashCodeService';
import CreateGameCodeService from '@modules/orders/services/CreateGameCodeService';
import RedeemCodeService from '@modules/orders/services/RedeemCodeService';

export default class GamestoreCodeController {
  public async createGameCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { game_id } = request.body;
    const createGamestoreCode = container.resolve(CreateGameCodeService);
    const game = await createGamestoreCode.execute({
      game_id,
    });

    return response.json(classToClass(game));
  }

  public async createCashCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cash } = request.body;
    const createGamestoreCode = container.resolve(CreateCashCodeService);
    const game = await createGamestoreCode.execute({
      cash,
    });

    return response.json(classToClass(game));
  }

  public async redeem(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const user_id = request.user.id;
    const redeemGamestoreCode = container.resolve(RedeemCodeService);
    const game = await redeemGamestoreCode.execute({
      code,
      user_id,
    });

    return response.json(classToClass(game));
  }
}
