import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import IGamestoreCodesRepository from '../repositories/IGamestoreCodeRepository';
import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';

interface IRequest {
  cash: number;
}

@injectable()
export default class CreateCashCodeService {
  constructor(
    @inject('GamestoreCodesRepository')
    private gamestoreCodesRepository: IGamestoreCodesRepository,
  ) {}

  public async execute({ cash }: IRequest): Promise<GamestoreCode> {
    const code = await this.gamestoreCodesRepository.create({
      code: uuidv4(),
      is_redeemed: false,
      product: {
        cash,
      },
    } as GamestoreCode);
    return code;
  }
}
