import AppError from '@shared/errors/AppError';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import FakeOrdersRepository from '../fakes/repositories/FakeOrdersRepository';

let fakeOrdersRepository: FakeOrdersRepository;
let showOrderService: ShowOrderService;

describe('ShowOrderService', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    showOrderService = new ShowOrderService(fakeOrdersRepository);
  });

  it('should be able to show order', async () => {
    const order = await fakeOrdersRepository.create({
      user_id: 'user',
      total_price: 150,
    });
    const displayedOrder = await showOrderService.execute({
      order_id: order.id,
    });

    expect(displayedOrder.user_id).toBe('user');
    expect(displayedOrder.total_price).toBe(150);
  });
  it('should not be able to show non existent order', async () => {
    await expect(
      showOrderService.execute({
        order_id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
