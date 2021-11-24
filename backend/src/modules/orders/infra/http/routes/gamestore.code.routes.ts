import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import GamestoreCodeController from '../controllers/GamestoreCodeController';

const GamestoreCodesRouter = Router();
const GamestoreCodesController = new GamestoreCodeController();

GamestoreCodesRouter.post('/cash', GamestoreCodesController.createCashCode);
GamestoreCodesRouter.post('/game', GamestoreCodesController.createGameCode);
GamestoreCodesRouter.post(
  '/:code',
  ensureAuthenticated,
  GamestoreCodesController.redeem,
);

export default GamestoreCodesRouter;
