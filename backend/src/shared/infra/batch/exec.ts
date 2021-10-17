import 'dotenv/config';
import { createConnections } from 'typeorm';
import '@shared/container';
import log from '@shared/utils/log';
import 'reflect-metadata';
import GamesCreateBatch from '@modules/games/infra/batch/GamesCreateBatch';
import GamesUpdateBatch from '@modules/games/infra/batch/GamesUpdateBatch';
import CodesCreateBatch from '@modules/orders/infra/batch/CodesCreateBatch';
import { BatchStrategy, IBatchOperation } from './BatchStrategy';

interface IStrategyMap {
  [key: string]: IBatchOperation | undefined;
}

const STRATEGIES: IStrategyMap = {
  CreateGames: new GamesCreateBatch(),
  UpdateGames: new GamesUpdateBatch(),
  CreateCodes: new CodesCreateBatch(),
};

const main = async (): Promise<undefined> => {
  if (!process.argv[2]) {
    log.error('No Arguments Provided');
    return;
  }
  const operation = process.argv[2];

  const strategy = STRATEGIES[operation];

  if (!strategy) {
    log.error('Invalid Operation');
    return;
  }

  await createConnections();
  const batch = new BatchStrategy();
  batch.setStrategy(strategy);
  await batch.exec();
  log.info('Done');
  return;
};

main();
