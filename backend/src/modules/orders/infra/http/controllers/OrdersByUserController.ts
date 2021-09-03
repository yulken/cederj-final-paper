import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowOrderDetailsService from '@modules/orders/services/ShowOrderDetailsService';
import ListOrdersByUserService from '@modules/orders/services/ListOrdersByUserService';

export default class OrdersByUserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;
    const showOrderDetails = container.resolve(ShowOrderDetailsService);

    const game = await showOrderDetails.execute({ order_id });

    return response.json(classToClass(game));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listOrders = container.resolve(ListOrdersByUserService);

    const game = await listOrders.execute({ user_id });

    return response.json(classToClass(game));
  }
}
