import { Router } from 'express';
import OrderGamesbyOrderController from '../controllers/OrderGamesByOrderController';

const orderGamesRouter = Router();
const orderGamesController = new OrderGamesbyOrderController();

orderGamesRouter.get('/', orderGamesController.index);
orderGamesRouter.get('/:order_game_id', orderGamesController.show);

export default orderGamesRouter;
