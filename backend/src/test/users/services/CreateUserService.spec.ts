import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '../fakes/repositories/FakeUsersRepository';
import FakeHashProvider from '../fakes/providers/HashProvider/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with a duplicated email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new user without password confirmation match', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '123111=56',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
