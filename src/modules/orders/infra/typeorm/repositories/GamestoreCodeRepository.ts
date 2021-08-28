import { getRepository, Repository } from 'typeorm';
import IGamestoreCodesRepository from '@modules/orders/repositories/IGamestoreCodeRepository';
import ICreateGamestoreCodeDTO from '@modules/orders/dtos/ICreateGamestoreCodeDTO';
import GamestoreCode from '../entities/GamestoreCode';

class GamestoreCodesRepository implements IGamestoreCodesRepository {
  private ormRepository: Repository<GamestoreCode>;

  constructor() {
    this.ormRepository = getRepository(GamestoreCode);
  }

  public async save(gamestoreCode: GamestoreCode): Promise<GamestoreCode> {
    return this.ormRepository.save(gamestoreCode);
  }

  public async findByCode(code: string): Promise<GamestoreCode | undefined> {
    return this.ormRepository.findOne(code);
  }

  public async create(data: ICreateGamestoreCodeDTO): Promise<GamestoreCode> {
    const code = this.ormRepository.create(data);
    await this.ormRepository.save(code);
    return code;
  }
}

export default GamestoreCodesRepository;
