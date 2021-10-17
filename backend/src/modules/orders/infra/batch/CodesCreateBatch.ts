import fs from 'fs';
import { container } from 'tsyringe';

import AbstractCodeTemplate from '@modules/orders/services/AbstractCodeTemplate';
import CreateCashCodeService from '@modules/orders/services/CreateCashCodeService';
import CreateGameCodeService from '@modules/orders/services/CreateGameCodeService';
import log from '@shared/utils/log';
import { IBatchOperation } from '@shared/infra/batch/BatchStrategy';
import GamestoreCode from '../typeorm/entities/GamestoreCode';

interface IServiceTypeMap {
  [key: string]: AbstractCodeTemplate | undefined;
}

interface IProductTypeMap {
  [key: string]: string | undefined;
}

const PRODUCTS: IProductTypeMap = {
  cash: 'cash',
  game: 'game_id',
};

export default class CodesCreateBatch implements IBatchOperation {
  public async exec(): Promise<void> {
    if (!process.argv[3]) {
      log.error('Filename not provided');
      return;
    }
    const csvPath = process.argv[3];
    let fileContent;

    try {
      fileContent = fs.readFileSync(csvPath);
    } catch (error) {
      log.error('File Not Found');
      return;
    }
    const lines = fileContent.toString().split('\n');

    const SERVICES: IServiceTypeMap = {
      cash: container.resolve(CreateCashCodeService),
      game: container.resolve(CreateGameCodeService),
    };

    const promises = lines
      .filter(line => line.length !== 0)
      .map(async (line: string): Promise<GamestoreCode | boolean> => {
        const [type, content] = line.split(',');
        const operation = SERVICES[type];
        const product = PRODUCTS[type];
        try {
          if (!operation || !product) {
            throw new Error('Invalid Operation');
          }

          return await operation.execute({
            [product]: content.trim(),
          });
        } catch (error) {
          return log.error(error);
        }
      });

    await Promise.all(promises);
  }
}
