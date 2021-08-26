import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import orderGamesRouter from './orderGames.routes';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/:order_id', ordersController.show);
ordersRouter.get('/:order_id', orderGamesRouter);

export default ordersRouter;
