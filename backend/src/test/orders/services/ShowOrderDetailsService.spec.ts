import AppError from '@shared/errors/AppError';
import ShowOrderDetailsService from '@modules/orders/services/ShowOrderDetailsService';
import FakeOrdersRepository from '../fakes/repositories/FakeOrdersRepository';
import FakeOrderGamesRepository from '../fakes/repositories/FakeOrderGamesRepository';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrderGamesRepository: FakeOrderGamesRepository;
let showOrderService: ShowOrderDetailsService;

describe('ShowOrderService', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrderGamesRepository = new FakeOrderGamesRepository();
    showOrderService = new ShowOrderDetailsService(
      fakeOrdersRepository,
      fakeOrderGamesRepository,
    );
  });

  it('should be able to show order', async () => {
    const order = await fakeOrdersRepository.create({
      user_id: 'user',
      total_price: 150,
    });
    await fakeOrderGamesRepository.create({
      game_id: 'game',
      order_id: order.id,
      price: 150,
    });
    const displayedOrder = await showOrderService.execute({
      order_id: order.id,
    });

    expect(displayedOrder.user_id).toBe('user');
    expect(displayedOrder.total_price).toBe(150);
    expect(displayedOrder.order_details[0].game_id).toBe('game');
  });
  it('should not be able to show non existent order', async () => {
    await expect(
      showOrderService.execute({
        order_id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
