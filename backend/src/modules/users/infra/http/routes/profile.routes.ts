import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profilesRouter = Router();
const profileController = new ProfileController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profileController.show);

profilesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().min(8).max(16),
      password: Joi.string().min(8).max(16),
      password_confirmation: Joi.string()
        .min(8)
        .max(16)
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profilesRouter;
