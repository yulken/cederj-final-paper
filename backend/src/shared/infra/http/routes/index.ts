import { Router, Request, Response } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import libraryRouter from '@modules/users/infra/http/routes/library.routes';
import gamesRouter from '@modules/games/infra/http/routes/games.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import gamestoreCodesRouter from '@modules/orders/infra/http/routes/gamestore.code.routes';

const routes = Router();

routes.use('/health-check', (_: Request, response: Response) => {
  response.sendStatus(204);
});
routes.use('/users', usersRouter);
routes.use('/library', libraryRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/games', gamesRouter);
routes.use('/orders', ordersRouter);
routes.use('/codes', gamestoreCodesRouter);

export default routes;
