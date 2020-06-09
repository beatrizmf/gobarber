import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '../repositories/INotificationsRepository';

import Notification from '../infra/typeorm/schemas/Notification';

@injectable()
class UpdateNotificationAsReadService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(notification_id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new AppError('notification not found');
    }

    Object.assign(notification, { read: true });

    return this.notificationsRepository.save(notification);
  }
}

export default UpdateNotificationAsReadService;
