import ListOrderGamesService from '@modules/orders/services/ListOrderGamesService';
import FakeOrderGamesRepository from '../fakes/repositories/FakeOrderGamesRepository';

let fakeOrderGamesRepository: FakeOrderGamesRepository;
let listOrderGamesService: ListOrderGamesService;

describe('ListOrderGamesService', () => {
  beforeEach(() => {
    fakeOrderGamesRepository = new FakeOrderGamesRepository();
    listOrderGamesService = new ListOrderGamesService(fakeOrderGamesRepository);
  });

  it('should be able to list order items', async () => {
    const orderItem = await fakeOrderGamesRepository.create({
      game_id: 'game',
      order_id: 'order',
      price: 100,
    });
    const displayedOrders = await listOrderGamesService.execute({
      order_id: 'order',
    });

    expect(displayedOrders).toEqual([orderItem]);
  });
});
