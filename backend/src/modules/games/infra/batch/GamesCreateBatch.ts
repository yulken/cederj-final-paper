import fs from 'fs';
import { container } from 'tsyringe';

import Game from '@modules/games/infra/typeorm/entities/Game';
import CreateGameService from '@modules/games/services/CreateGameService';
import log from '@shared/utils/log';
import { IBatchOperation } from '@shared/infra/batch/BatchStrategy';

export default class GamesCreateBatch implements IBatchOperation {
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

    const createGame = container.resolve(CreateGameService);

    const promises = lines
      .filter(line => line.length !== 0)
      .map(async (line: string): Promise<Game | boolean> => {
        const [name, price, publisher, raw_release_date] = line.split(',');
        try {
          const release_date = new Date(raw_release_date);

          if (!release_date) {
            throw Error('Invalid Line');
          }

          return await createGame.execute({
            name,
            price: Number(price),
            publisher,
            release_date,
          });
        } catch (error) {
          return log.error(error);
        }
      });

    await Promise.all(promises);
  }
}
