import { Router } from 'express';
import OrdersbyUserController from '../controllers/OrdersByUserController';

const orderUsersRouter = Router();
const orderUsersController = new OrdersbyUserController();

orderUsersRouter.get('/', orderUsersController.index);
orderUsersRouter.get('/:order_id', orderUsersController.show);

export default orderUsersRouter;
