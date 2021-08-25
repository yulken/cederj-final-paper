import { Router } from 'express';
import GamesController from '../controllers/GamesController';

const gamesRouter = Router();
const gamesController = new GamesController();

gamesRouter.post('/', gamesController.create);
gamesRouter.get('/:game_id', gamesController.show);
gamesRouter.put('/:game_id', gamesController.update);

export default gamesRouter;
