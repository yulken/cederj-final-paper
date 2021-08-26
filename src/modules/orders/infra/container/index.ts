import { container } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderGamesRepository from '@modules/orders/repositories/IOrderGamesRepository';
import OrderGamesRepository from '@modules/orders/infra/typeorm/repositories/OrderGamesRepository';

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrderGamesRepository>(
  'OrderGamesRepository',
  OrderGamesRepository,
);
