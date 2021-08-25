import AppError from '@shared/errors/AppError';
import ShowGameService from '@modules/games/services/ShowGameService';
import FakeGamesRepository from '../fakes/repositories/FakeGamesRepository';

let fakeGamesRepository: FakeGamesRepository;
let showGameService: ShowGameService;

describe('ShowGameService', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();
    showGameService = new ShowGameService(fakeGamesRepository);
  });

  it('should be able to show game', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const displayedGame = await showGameService.execute({ game_id: game.id });

    expect(displayedGame.name).toBe('Cyberpunk');
    expect(displayedGame.price).toBe(80.0);
  });
  it('should not be able to show non existent game', async () => {
    await expect(
      showGameService.execute({
        game_id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
