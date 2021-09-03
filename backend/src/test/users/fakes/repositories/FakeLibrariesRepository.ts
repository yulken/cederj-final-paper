import ILibrariesRepository from '@modules/users/repositories/ILibrariesRepository';
import ICreateLibraryDTO from '@modules/users/dtos/ICreateLibraryDTO';

import { v4 as uuidv4 } from 'uuid';
import Library from '@modules/users/infra/typeorm/entities/Library';

export default class FakeLibrariesRepository implements ILibrariesRepository {
  private libraries: Library[] = [];

  public async findByUserId(user_id: string): Promise<Library[]> {
    return this.libraries.filter(library => library.user_id === user_id);
  }

  public async findByUserIdAndGameId({
    user_id,
    game_id,
  }: ICreateLibraryDTO): Promise<Library[]> {
    return this.libraries.filter(
      library => library.user_id === user_id && library.game_id === game_id,
    );
  }

  public async create(libraryData: ICreateLibraryDTO): Promise<Library> {
    const library = new Library();

    Object.assign(library, { id: uuidv4() }, libraryData, {
      last_played: null,
    });

    this.libraries.push(library);
    return library;
  }

  public async save(library: Library): Promise<Library> {
    const findIndex = this.libraries.findIndex(
      findLibrary => findLibrary.id === library.id,
    );
    this.libraries[findIndex] = library;
    return library;
  }
}
