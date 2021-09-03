import ILibrariesRepository from '@modules/users/repositories/ILibrariesRepository';
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
    private gamestoreCodesRepository: IGamestoreCodesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LibrariesRepository')
    private librariesRepository: ILibrariesRepository,
  ) {}

  public async execute({ code, user_id }: IRequest): Promise<GamestoreCode> {
    console.log(code);
    const item = await this.gamestoreCodesRepository.findByCode(code);
    if (!item) {
      throw new AppError('Code is invalid');
    }
    if (item.is_redeemed) {
      throw new AppError('Code already redeemed');
    }
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }
    const now = Date.now();

    Object.assign(item, {
      user_id,
      redeemed_at: new Date(now),
      is_redeemed: true,
    });

    if (item.product.game) {
      this.librariesRepository.create({
        user_id,
        game_id: item.product.game,
      });
    }

    if (item.product.cash) {
      this.usersRepository.addToBalance(user, item.product.cash);
    }
    return this.gamestoreCodesRepository.save(item);
  }
}
