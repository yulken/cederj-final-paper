import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

export interface ICashRedeem {
  cash: number;
}

export interface IGameRedeem {
  game: string;
}

@Entity('gamestore_codes')
export default class GamestoreCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  code: string;

  @Column()
  json: ICashRedeem | IGameRedeem;

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
