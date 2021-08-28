import CreateGameCodeService from '@modules/orders/services/CreateGameCodeService';
import AppError from '@shared/errors/AppError';
import FakeGamesRepository from '@test/games/fakes/repositories/FakeGamesRepository';
import FakeGamestoreCodesRepository from '../fakes/repositories/FakeGamestoreCodeRepository';

let fakeGamestoreCodesRepository: FakeGamestoreCodesRepository;
let fakeGamesRepository: FakeGamesRepository;
let createGamestoreCode: CreateGameCodeService;

describe('CreateGamestoreCode', () => {
  beforeEach(() => {
    fakeGamestoreCodesRepository = new FakeGamestoreCodesRepository();
    fakeGamesRepository = new FakeGamesRepository();
    createGamestoreCode = new CreateGameCodeService(
      fakeGamesRepository,
      fakeGamestoreCodesRepository,
    );
  });
  it('should be able to create a new order', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const gameCode = await createGamestoreCode.execute({
      game_id: game.id,
    });

    expect(gameCode.json).toEqual({ game: game.id });
  });
  it('should not be create a new order when game does not exist', async () => {
    await expect(
      createGamestoreCode.execute({
        game_id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
