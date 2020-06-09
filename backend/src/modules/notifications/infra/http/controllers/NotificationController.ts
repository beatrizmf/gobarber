import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateNotificationAsReadService from '@modules/notifications/services/UpdateNotificationAsReadService';

export default class NotificationController {
  public async update(req: Request, res: Response) {
    const { notification_id } = req.params;

    const updateNotificationAsRead = container.resolve(
      UpdateNotificationAsReadService,
    );

    await updateNotificationAsRead.execute(notification_id);

    return res.status(204).json();
  }
}
