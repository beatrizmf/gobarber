import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import ListNotificationsService from '@modules/notifications/services/ListNotificationsService';

export default class NotificationsController {
  public async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const listNotifications = container.resolve(ListNotificationsService);

    const notifications = await listNotifications.execute(user_id);

    return res.json(classToClass(notifications));
  }
}
