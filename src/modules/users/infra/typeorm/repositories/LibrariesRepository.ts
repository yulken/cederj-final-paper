import { getRepository, Repository } from 'typeorm';
import ICreateLibraryDTO from '@modules/users/dtos/ICreateLibraryDTO';
import ILibrariesRepository from '@modules/users/repositories/ILibrariesRepository';

import Library from '../entities/Library';

export default class LibrariesRepository implements ILibrariesRepository {
  private ormRepository: Repository<Library>;

  constructor() {
    this.ormRepository = getRepository(Library);
  }

  public async findByUserId(user_id: string): Promise<Library[]> {
    return this.ormRepository.find({ where: user_id });
  }

  public async findByUserIdAndGameId({
    user_id,
    game_id,
  }: ICreateLibraryDTO): Promise<Library[]> {
    return this.ormRepository.find({ where: { user_id, game_id } });
  }

  public async create(libraryData: ICreateLibraryDTO): Promise<Library> {
    const library = this.ormRepository.create({
      ...libraryData,
      play_time: 0,
    });
    await this.ormRepository.save(library);
    return library;
  }

  public async save(library: Library): Promise<Library> {
    return this.ormRepository.save(library);
  }
}
