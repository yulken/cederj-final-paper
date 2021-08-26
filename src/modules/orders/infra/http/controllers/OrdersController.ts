import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { order_games } = request.body;
    const createOrder = container.resolve(CreateOrderService);
    const game = await createOrder.execute({
      user_id,
      order_games,
    });

    return response.json(classToClass(game));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;
    const showOrder = container.resolve(ShowOrderService);

    const game = await showOrder.execute({ order_id });

    return response.json(classToClass(game));
  }
}
