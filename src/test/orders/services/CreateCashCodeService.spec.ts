import CreateCashCodeService from '@modules/orders/services/CreateCashCodeService';
import FakeGamestoreCodesRepository from '../fakes/repositories/FakeGamestoreCodeRepository';

let fakeGamestoreCodesRepository: FakeGamestoreCodesRepository;
let createCashCodeService: CreateCashCodeService;

describe('CreateGamestoreCode', () => {
  beforeEach(() => {
    fakeGamestoreCodesRepository = new FakeGamestoreCodesRepository();
    createCashCodeService = new CreateCashCodeService(
      fakeGamestoreCodesRepository,
    );
  });
  it('should be able to create a new cash code', async () => {
    const gameCode = await createCashCodeService.execute({
      cash: 100,
    });

    expect(gameCode.json).toEqual({ cash: 100 });
  });
});
