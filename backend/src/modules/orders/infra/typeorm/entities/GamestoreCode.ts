import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

export interface IProduct {
  cash?: number;
  game?: string;
}

@Entity('gamestore_codes')
export default class GamestoreCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  code: string;

  @Column({ type: 'json' })
  product: IProduct;

  @Column()
  is_redeemed: boolean;

  @Column()
  user_id: string;

  @Column()
  redeemed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
