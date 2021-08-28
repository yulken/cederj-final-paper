import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';
import orderGamesRouter from './order.games.routes';
import orderUsersRouter from './orders.users.routes';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', ordersController.create);
ordersRouter.use('/', orderUsersRouter);
ordersRouter.use('/:order_id', orderGamesRouter);

export default ordersRouter;
