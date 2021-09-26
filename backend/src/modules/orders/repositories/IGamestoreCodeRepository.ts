import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';
import ICreateGamestoreCodeDTO from '../dtos/ICreateGamestoreCodeDTO';

export default interface IGamestoreCodesRepository {
  findByCode(code: string): Promise<GamestoreCode | undefined>;
  create(data: ICreateGamestoreCodeDTO): Promise<GamestoreCode>;
  save(gamestoreCode: GamestoreCode): Promise<GamestoreCode>;
}
