import ShowOrderGamesService from '@modules/orders/services/ShowOrderGamesService';
import AppError from '@shared/errors/AppError';
import FakeOrderGamesRepository from '../fakes/repositories/FakeOrderGamesRepository';

let fakeOrderGamesRepository: FakeOrderGamesRepository;
let listOrderGamesService: ShowOrderGamesService;

describe('ShowOrderGamesService', () => {
  beforeEach(() => {
    fakeOrderGamesRepository = new FakeOrderGamesRepository();
    listOrderGamesService = new ShowOrderGamesService(fakeOrderGamesRepository);
  });

  it('should be able to show order items', async () => {
    const orderItem = await fakeOrderGamesRepository.create({
      game_id: 'game',
      order_id: 'order',
      price: 100,
    });
    const displayedOrder = await listOrderGamesService.execute({
      order_game_id: orderItem.id,
    });

    expect(displayedOrder.game_id).toEqual('game');
    expect(displayedOrder.order_id).toEqual('order');
  });
  it('should not be able to show inexistent order items', async () => {
    await expect(
      listOrderGamesService.execute({
        order_game_id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
