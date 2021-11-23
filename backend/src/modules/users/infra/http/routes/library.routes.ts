import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import LibraryController from '../controllers/LibraryController';

const libraryRouter = Router();
libraryRouter.get('/', ensureAuthenticated, new LibraryController().index);
libraryRouter.get(
  '/:game_id',
  ensureAuthenticated,
  new LibraryController().show,
);

export default libraryRouter;
