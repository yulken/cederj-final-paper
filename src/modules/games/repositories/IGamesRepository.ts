import ICreateGameDTO from '../dtos/ICreateGameDTO';
import Game from '../infra/typeorm/entities/Game';

export default interface IGamesRepository {
  findById(id: string): Promise<Game | undefined>;
  create(data: ICreateGameDTO): Promise<Game>;
  save(game: Game): Promise<Game>;
}
