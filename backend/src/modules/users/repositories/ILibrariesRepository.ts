import ICreateLibraryDTO from '../dtos/ICreateLibraryDTO';
import Library from '../infra/typeorm/entities/Library';

export default interface ILibrariesRepository {
  findByUserId(user_id: string): Promise<Library[]>;
  findByUserIdAndGameId(data: ICreateLibraryDTO): Promise<Library[]>;
  create(data: ICreateLibraryDTO): Promise<Library>;
  save(library: Library): Promise<Library>;
}
