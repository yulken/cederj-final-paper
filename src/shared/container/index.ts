import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import GamesRepository from '@modules/games/infra/typeorm/repositories/GamesRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);
