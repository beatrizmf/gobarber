import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';
import NotificationController from '../controllers/NotificationController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();
const notificationController = new NotificationController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get('/', notificationsController.index);
notificationsRouter.patch(
  '/:notification_id',
  celebrate({
    [Segments.PARAMS]: {
      notification_id: Joi.string().length(24).required(),
    },
  }),
  notificationController.update,
);

export default notificationsRouter;
