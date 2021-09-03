import { container } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderGamesRepository from '@modules/orders/repositories/IOrderGamesRepository';
import OrderGamesRepository from '@modules/orders/infra/typeorm/repositories/OrderGamesRepository';

import IGamestoreCodesRepository from '@modules/orders/repositories/IGamestoreCodeRepository';
import GamestoreCodesRepository from '../typeorm/repositories/GamestoreCodeRepository';

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrderGamesRepository>(
  'OrderGamesRepository',
  OrderGamesRepository,
);

container.registerSingleton<IGamestoreCodesRepository>(
  'GamestoreCodesRepository',
  GamestoreCodesRepository,
);
