import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import { v4 as uuidv4 } from 'uuid';
import Order from '@modules/orders/infra/typeorm/entities/Order';

export default class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async findById(id: string): Promise<Order | undefined> {
    return this.orders.find(order => order.id === id);
  }

  public async findByUserId(user_id: string): Promise<Order[]> {
    return this.orders.filter(order => order.user_id === user_id);
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = new Order();
    Object.assign(order, { id: uuidv4() }, orderData);
    this.orders.push(order);
    return order;
  }
}
