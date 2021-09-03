import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  findById(id: string): Promise<Order | undefined>;
  findByUserId(user_id: string): Promise<Order[]>;
  create(data: ICreateOrderDTO): Promise<Order>;
}
