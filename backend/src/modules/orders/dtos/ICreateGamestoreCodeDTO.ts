import { IProduct } from '../infra/typeorm/entities/GamestoreCode';

export default interface ICreateGamestoreCodeDTO {
  id: string;

  code: string;

  product: IProduct;

  is_redeemed: boolean;

  user_id: string;

  redeemed_at: Date;
}
