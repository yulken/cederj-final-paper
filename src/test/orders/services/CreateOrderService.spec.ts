import OrderGame from '@modules/orders/infra/typeorm/entities/OrderGame';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import AppError from '@shared/errors/AppError';
import FakeGamesRepository from '@test/games/fakes/repositories/FakeGamesRepository';
import FakeLibrariesRepository from '@test/users/fakes/repositories/FakeLibrariesRepository';
import FakeUsersRepository from '@test/users/fakes/repositories/FakeUsersRepository';
import FakeOrderGamesRepository from '../fakes/repositories/FakeOrderGamesRepository';
import FakeOrdersRepository from '../fakes/repositories/FakeOrdersRepository';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrderGamesRepository: FakeOrderGamesRepository;
let fakeGamesRepository: FakeGamesRepository;
let fakeLibrariesRepository: FakeLibrariesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrderGamesRepository = new FakeOrderGamesRepository();
    fakeLibrariesRepository = new FakeLibrariesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeGamesRepository = new FakeGamesRepository();
    createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeUsersRepository,
      fakeLibrariesRepository,
      fakeGamesRepository,
      fakeOrderGamesRepository,
    );
  });
  it('should be able to create a new order', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    const game2 = await fakeGamesRepository.create({
      name: 'Mario',
      price: 100.0,
      publisher: 'Nintendo',
      release_date: new Date(2021, 1, 1),
    });
    const orders = [
      { game_id: game.id, price: game.price },
      { game_id: game2.id, price: game2.price },
    ] as OrderGame[];

    const order = await createOrder.execute({
      user_id: user.id,
      order_games: orders,
    });

    expect(order.total_price).toEqual(game.price + game2.price);
    expect(order.user_id).toEqual(user.id);
  });
  it('should not be create a new order when user does not exist', async () => {
    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });
    const game2 = await fakeGamesRepository.create({
      name: 'Mario',
      price: 100.0,
      publisher: 'Nintendo',
      release_date: new Date(2021, 1, 1),
    });
    const orders = [
      { game_id: game.id, price: game.price },
      { game_id: game2.id, price: game2.price },
    ] as OrderGame[];

    await expect(
      createOrder.execute({
        user_id: 'inexistent',
        order_games: orders,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be create a new order when user already has a game of the list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const game = await fakeGamesRepository.create({
      name: 'Cyberpunk',
      price: 80.0,
      publisher: 'CD Projekt Red',
      release_date: new Date(2021, 1, 1),
    });

    await fakeLibrariesRepository.create({
      game_id: game.id,
      user_id: user.id,
    });

    const orders = [{ game_id: game.id, price: game.price }] as OrderGame[];

    await expect(
      createOrder.execute({
        user_id: user.id,
        order_games: orders,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be create a new order when game does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const orders = [{ game_id: 'inexistent', price: 1000 }] as OrderGame[];

    await expect(
      createOrder.execute({
        user_id: user.id,
        order_games: orders,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
