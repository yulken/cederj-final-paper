import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import OrderGame from '../infra/typeorm/entities/OrderGame';
import IOrderGamesRepository from '../repositories/IOrderGamesRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
}

interface IOrderDetails {
  id: string;
  user_id: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  order_details: OrderGame[];
}

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('OrderGamesRepository')
    private orderGamesRepository: IOrderGamesRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<IOrderDetails> {
    const order = await this.ordersRepository.findById(order_id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    const orderDetails = await this.orderGamesRepository.findByOrderId(
      order_id,
    );

    return {
      ...order,
      order_details: orderDetails,
    };
  }
}
