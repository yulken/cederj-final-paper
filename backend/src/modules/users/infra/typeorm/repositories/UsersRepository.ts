import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';
import log from '@shared/utils/log';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    log.debug("Users :: findById")
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    log.debug("Users :: findByEmail")
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    log.debug("Users :: findByDate")
    const findUser = await this.ormRepository.findOne({
      where: { date },
    });
    return findUser || undefined;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    log.debug("Users :: create")
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    log.debug("Users :: save")
    return this.ormRepository.save(user);
  }

  public async addToBalance(user: User, value: number): Promise<void> {
    log.debug("Users :: addToBalance")
    const newBalance = Number(user.balance) + Number(value);
    Object.assign(user, { balance: newBalance });
    await this.ormRepository.save(user);
  }

  public async removeFromBalance(user: User, value: number): Promise<void> {
    log.debug("Users :: removeFromBalance")
    const newBalance = Number(user.balance) - Number(value);
    Object.assign(user, { balance: newBalance });
    await this.ormRepository.save(user);
  }
}

export default UsersRepository;
