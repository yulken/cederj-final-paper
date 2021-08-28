import ListLibraryItemsService from '@modules/users/services/ListLibraryItemsService';
import FakeGamesRepository from '@test/games/fakes/repositories/FakeGamesRepository';
import FakeUsersRepository from '../fakes/repositories/FakeUsersRepository';
import FakeLibrariesRepository from '../fakes/repositories/FakeLibrariesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeGamesRepository: FakeGamesRepository;
let fakeLibrariesRepository: FakeLibrariesRepository;
let listLibraryItemsService: ListLibraryItemsService;

describe('ListOwnedGamesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGamesRepository = new FakeGamesRepository();
    fakeLibrariesRepository = new FakeLibrariesRepository();
    listLibraryItemsService = new ListLibraryItemsService(
      fakeLibrariesRepository,
      fakeGamesRepository,
    );
  });

  it('should be able to list owned games', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const gameList1 = await listLibraryItemsService.execute({
      user_id: user.id,
    });

    expect(gameList1).toEqual([]);

    await fakeLibrariesRepository.create({
      user_id: user.id,
      game_id: game.id,
    });

    const gameList2 = await listLibraryItemsService.execute({
      user_id: user.id,
    });

    expect(gameList2).toEqual([game]);
  });
});
