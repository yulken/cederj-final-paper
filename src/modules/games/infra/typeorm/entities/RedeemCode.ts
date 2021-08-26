import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface ICashRedeem {
  cash: number;
}

interface IGameRedeem {
  game: string;
}

@Entity('redeem_codes')
export default class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  json: ICashRedeem | IGameRedeem;

  @Column()
  is_redeemed: boolean;

  @Column()
  redeemed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
