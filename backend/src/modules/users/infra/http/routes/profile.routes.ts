import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/:user_id', profileController.show);
profileRouter.put('/', ensureAuthenticated, profileController.update);

export default profileRouter;
