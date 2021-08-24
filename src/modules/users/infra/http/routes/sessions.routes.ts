import { Router } from 'express';
import validateInput from '@shared/infra/http/middlewares/validateInput';
import SessionsController from '../controllers/SessionsController';
import AuthUserValidator from '../validators/AuthUserValidator';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
sessionsRouter.post(
  '/',
  validateInput(new AuthUserValidator('body')),
  sessionsController.create,
);

export default sessionsRouter;
