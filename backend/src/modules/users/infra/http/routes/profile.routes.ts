import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profilesRouter = Router();
const profileController = new ProfileController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profileController.show);
profilesRouter.put('/', profileController.update);

export default profilesRouter;
