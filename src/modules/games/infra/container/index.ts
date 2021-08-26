import { container } from 'tsyringe';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import GamesRepository from '@modules/games/infra/typeorm/repositories/GamesRepository';

import '@modules/users/infra/container';

container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);
