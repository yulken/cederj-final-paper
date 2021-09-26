import ListOrdersByUserService from '@modules/orders/services/ListOrdersByUserService';
import FakeOrdersRepository from '../fakes/repositories/FakeOrdersRepository';

let fakeOrdersRepository: FakeOrdersRepository;
let listOrderGamesService: ListOrdersByUserService;

describe('ListOrdersByUserService', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrderGamesService = new ListOrdersByUserService(fakeOrdersRepository);
  });

  it('should be able to list order items', async () => {
    const orderItem = await fakeOrdersRepository.create({
      user_id: 'user',
      total_price: 100,
    });
    const displayedOrders = await listOrderGamesService.execute({
      user_id: 'user',
    });

    expect(displayedOrders).toEqual([orderItem]);
  });
});
