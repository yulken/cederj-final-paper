import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import IGamestoreCodesRepository from '../repositories/IGamestoreCodeRepository';
import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';
import AbstractCodeTemplate, { IRequest } from './AbstractCodeTemplate';

@injectable()
export default class CreateCashCodeService extends AbstractCodeTemplate {
  constructor(
    @inject('GamestoreCodesRepository')
    private gamestoreCodesRepository: IGamestoreCodesRepository,
  ) {
    super();
  }

  protected async createCode({ cash }: IRequest): Promise<GamestoreCode> {
    const code = await this.gamestoreCodesRepository.create({
      code: uuidv4(),
      is_redeemed: false,
      product: {
        cash,
      },
    } as GamestoreCode);
    return code;
  }

  protected async validateData(_request: IRequest): Promise<void> {
    return;
  }
}
