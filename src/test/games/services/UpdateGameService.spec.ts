import AppError from '@shared/errors/AppError';
import UpdateGameService from '@modules/games/services/UpdateGameService';
import FakeGamesRepository from '../fakes/repositories/FakeGamesRepository';

let fakeGamesRepository: FakeGamesRepository;
let updateGameService: UpdateGameService;

describe('UpdateGameService', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();
    updateGameService = new UpdateGameService(fakeGamesRepository);
  });

  it('should be able to update price', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    const updatedGame = await updateGameService.execute({
      game_id: game.id,
      price: 40.0,
    });

    expect(updatedGame.name).toBe('Cyberpunk');
    expect(updatedGame.price).toBe(40.0);
  });
  it('should be able to update release date', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 10, 1);
      return customDate.getTime();
    });
    const newDate = new Date(2022, 1, 1);
    const updatedGame = await updateGameService.execute({
      game_id: game.id,
      release_date: newDate,
    });

    expect(updatedGame.release_date).toBe(newDate);
  });
  it('should not be able to update price to a negative value', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    await expect(
      updateGameService.execute({
        game_id: game.id,
        price: -10.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update release date to a past date', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 10, 1);
      return customDate.getTime();
    });

    await expect(
      updateGameService.execute({
        game_id: game.id,
        release_date: new Date(2020, 1, 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update release date if date is already passed', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2021, 10, 1);
      return customDate.getTime();
    });

    await expect(
      updateGameService.execute({
        game_id: game.id,
        release_date: new Date(2022, 9, 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
