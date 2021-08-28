import IGamestoreCodesRepository from '@modules/orders/repositories/IGamestoreCodeRepository';
import ICreateGamestoreCodeDTO from '@modules/orders/dtos/ICreateGamestoreCodeDTO';

import { v4 as uuidv4 } from 'uuid';
import GamestoreCode from '@modules/orders/infra/typeorm/entities/GamestoreCode';

export default class FakeGamestoreCodeRepository
  implements IGamestoreCodesRepository
{
  private gamestoreCodes: GamestoreCode[] = [];

  public async save(gamestoreCode: GamestoreCode): Promise<GamestoreCode> {
    const findIndex = this.gamestoreCodes.findIndex(
      findGamestoreCode => findGamestoreCode.id === gamestoreCode.id,
    );
    this.gamestoreCodes[findIndex] = gamestoreCode;
    return gamestoreCode;
  }

  public async findByCode(code: string): Promise<GamestoreCode | undefined> {
    return this.gamestoreCodes.find(
      gamestoreCode => gamestoreCode.code === code,
    );
  }

  public async create(data: ICreateGamestoreCodeDTO): Promise<GamestoreCode> {
    const gamestoreCode = new GamestoreCode();
    Object.assign(gamestoreCode, { id: uuidv4() }, data);
    this.gamestoreCodes.push(gamestoreCode);
    return gamestoreCode;
  }
}
