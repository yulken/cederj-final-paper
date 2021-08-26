import CreateGameService from '@modules/games/services/CreateGameService';
import FakeGamesRepository from '../fakes/repositories/FakeGamesRepository';

let fakeGamesRepository: FakeGamesRepository;
let createGame: CreateGameService;

describe('CreateGame', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();
    createGame = new CreateGameService(fakeGamesRepository);
  });
  it('should be able to create a new game', async () => {
    const game = await createGame.execute({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    expect(game).toHaveProperty('id');
  });
});
