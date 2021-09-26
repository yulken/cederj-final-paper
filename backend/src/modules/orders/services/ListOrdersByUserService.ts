import { injectable, inject } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.findByUserId(user_id);
    return orders;
  }
}
