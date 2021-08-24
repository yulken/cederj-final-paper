import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  nickname: string;
  email: string;
  old_password?: string;
  password?: string;
  passwordConfirmation?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    nickname,
    email,
    password,
    old_password,
    passwordConfirmation,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use');
    }

    if (password) {
      if (!old_password) {
        throw new AppError('You need to provide your old password');
      }

      if (!passwordConfirmation) {
        throw new AppError('You need to confirm your new password');
      }

      if (password !== passwordConfirmation) {
        throw new AppError('Password must match its confirmation');
      }

      if (!(await this.hashProvider.compareHash(old_password, user.password)))
        throw new AppError('Old password is incorrect');

      user.password = await this.hashProvider.generateHash(password);
    }
    Object.assign(user, { name, email, nickname });
    return this.usersRepository.save(user);
  }
}
