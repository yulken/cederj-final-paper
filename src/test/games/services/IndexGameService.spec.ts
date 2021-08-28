import IndexGameService from '@modules/games/services/IndexGameService';
import FakeGamesRepository from '../fakes/repositories/FakeGamesRepository';

let fakeGamesRepository: FakeGamesRepository;
let indexGameService: IndexGameService;

describe('IndexGameService', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();
    indexGameService = new IndexGameService(fakeGamesRepository);
  });

  it('should be able to show game', async () => {
    const game1 = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const game2 = await fakeGamesRepository.create({
      name: 'Mario',
      price: 80.0,
      developer: 'Nintendp',
      publisher: 'Nintendp',
      release_date: new Date(2021, 1, 1),
    });

    const availableGames = await indexGameService.execute();
    expect(availableGames).toEqual([game1, game2]);
  });
});
