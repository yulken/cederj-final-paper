import AppError from '@shared/errors/AppError';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUsersRepository from '../fakes/repositories/FakeUsersRepository';
import FakeUserTokensRepository from '../fakes/repositories/FakeUserTokensRepository';
import FakeHashProvider from '../fakes/providers/HashProvider/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: '123123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      token,
      password: '123123',
      passwordConfirmation: '123123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non existing token', async () => {
    expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
        passwordConfirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    expect(
      resetPasswordService.execute({
        token,
        password: '123456',
        passwordConfirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: '123123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
        passwordConfirmation: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password with different confirmation password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nickname: '123123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
        passwordConfirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
