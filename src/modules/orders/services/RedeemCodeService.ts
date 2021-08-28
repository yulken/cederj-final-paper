import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';

import IGamestoreCodesRepository from '../repositories/IGamestoreCodeRepository';

interface IRequest {
  code: string;
  user_id: string;
}

@injectable()
export default class RedeemCodeService {
  constructor(
    @inject('GamestoreCodesRepository')
    private gameStoreCodesRepository: IGamestoreCodesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ code, user_id }: IRequest): Promise<GamestoreCode> {
    const item = await this.gameStoreCodesRepository.findByCode(code);
    if (!item) {
      throw new AppError('Code is invalid');
    }
    if (item.is_redeemed) {
      throw new AppError('Code already redeemed');
    }
    if (!(await this.usersRepository.findById(user_id))) {
      throw new AppError('User does not exist');
    }
    const now = Date.now();
    Object.assign(item, {
      user_id,
      redeemed_at: new Date(now),
      is_redeemed: true,
    });

    return this.gameStoreCodesRepository.save(item);
  }
}
