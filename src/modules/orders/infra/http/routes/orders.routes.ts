import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';
import orderGamesRouter from './orderGames.routes';
import orderUsersRouter from './ordersUsers.routes';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', ordersController.create);
ordersRouter.use('/', orderUsersRouter);
ordersRouter.use('/:order_id', orderGamesRouter);

export default ordersRouter;
