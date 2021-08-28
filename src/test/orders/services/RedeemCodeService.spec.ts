import GamestoreCode from '@modules/orders/infra/typeorm/entities/GamestoreCode';
import RedeemCodeService from '@modules/orders/services/RedeemCodeService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@test/users/fakes/repositories/FakeUsersRepository';
import FakeGamestoreCodesRepository from '../fakes/repositories/FakeGamestoreCodeRepository';

let fakeGamestoreCodesRepository: FakeGamestoreCodesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createCashCodeService: RedeemCodeService;

describe('CreateGamestoreCode', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGamestoreCodesRepository = new FakeGamestoreCodesRepository();
    createCashCodeService = new RedeemCodeService(
      fakeGamestoreCodesRepository,
      fakeUsersRepository,
    );
  });
  it('should be able to redeem code', async () => {
    await fakeGamestoreCodesRepository.create({
      id: 'code_id',
      code: 'aaaaa',
      json: {
        game: 'Amazing game',
      },
      is_redeemed: false,
    } as GamestoreCode);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const gameCode = await createCashCodeService.execute({
      code: 'aaaaa',
      user_id: user.id,
    });

    expect(gameCode.json).toEqual({ game: 'Amazing game' });
  });
  it('should not be able to redeem an invalid code', async () => {
    await expect(
      createCashCodeService.execute({
        code: 'aaaaa',
        user_id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to redeem code from a inexistent user', async () => {
    await fakeGamestoreCodesRepository.create({
      id: 'code_id',
      code: 'aaaaa',
      json: {
        game: 'Amazing game',
      },
      is_redeemed: false,
    } as GamestoreCode);

    await expect(
      createCashCodeService.execute({
        code: 'aaaaa',
        user_id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to redeem a code already redeemed', async () => {
    await fakeGamestoreCodesRepository.create({
      id: 'code_id',
      code: 'aaaaa',
      json: {
        game: 'Amazing game',
      },
      is_redeemed: false,
    } as GamestoreCode);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'Noobmaster69',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joao da Silva',
      nickname: 'Noobmaster70',
      email: 'joao@example.com',
      password: '123456',
    });

    await createCashCodeService.execute({
      code: 'aaaaa',
      user_id: user.id,
    });

    await expect(
      createCashCodeService.execute({
        code: 'aaaaa',
        user_id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
