import { Router, Request, Response } from 'express';

const routes = Router();

routes.use('/health-check', (request: Request, response: Response) => {
  response.sendStatus(204);
});
export default routes;
