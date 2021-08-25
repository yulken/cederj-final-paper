import AppError from '@shared/errors/AppError';
import FakeGamesRepository from '@test/games/fakes/repositories/FakeGamesRepository';
import CreateLibraryService from '@modules/users/services/CreateLibraryItem';
import FakeUsersRepository from '../fakes/repositories/FakeUsersRepository';
import FakeLibrariesRepository from '../fakes/repositories/FakeLibrariesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeGamesRepository: FakeGamesRepository;
let fakeLibrariesRepository: FakeLibrariesRepository;
let createLibrary: CreateLibraryService;

describe('CreateLibrary', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGamesRepository = new FakeGamesRepository();
    fakeLibrariesRepository = new FakeLibrariesRepository();
    createLibrary = new CreateLibraryService(
      fakeLibrariesRepository,
      fakeUsersRepository,
      fakeGamesRepository,
    );
  });
  it('should be able to create a new library item', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const library = await createLibrary.execute({
      user_id: user.id,
      game_id: game.id,
    });
    expect(library.user_id).toEqual(user.id);
    expect(library.game_id).toEqual(game.id);
  });

  it('should not be able to create a duplicated library item', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const library = await createLibrary.execute({
      user_id: user.id,
      game_id: game.id,
    });
    expect(library.user_id).toEqual(user.id);
    await expect(
      createLibrary.execute({
        user_id: user.id,
        game_id: game.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a library item with inexistent user/game', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    await expect(
      createLibrary.execute({
        user_id: 'inexistent',
        game_id: game.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createLibrary.execute({
        user_id: user.id,
        game_id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
