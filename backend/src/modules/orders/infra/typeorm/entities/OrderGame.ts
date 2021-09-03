import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('order_games')
export default class OrderGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  game_id: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;
}
