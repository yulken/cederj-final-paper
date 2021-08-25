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
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      releaseDate: new Date(2021, 1, 1),
    });

    expect(game).toHaveProperty('id');
  });
});
