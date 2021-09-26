import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import Library from '../infra/typeorm/entities/Library';
import ICreateLibraryDTO from '../dtos/ICreateLibraryDTO';
import ILibrariesRepository from '../repositories/ILibrariesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateLibraryService {
  constructor(
    @inject('LibrariesRepository')
    private librariesRepository: ILibrariesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({
    user_id,
    game_id,
  }: ICreateLibraryDTO): Promise<Library> {
    if (!(await this.usersRepository.findById(user_id))) {
      throw new AppError('User does not exist');
    }

    if (!(await this.gamesRepository.findById(game_id))) {
      throw new AppError('Game does not exist');
    }

    const checkLibrary = await this.librariesRepository.findByUserIdAndGameId({
      user_id,
      game_id,
    });
    if (checkLibrary.length > 0) {
      throw new AppError('User already has Game');
    }
    const library = await this.librariesRepository.create({
      game_id,
      user_id,
    });

    await this.librariesRepository.save(library);

    return library;
  }
}
