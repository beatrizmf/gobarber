import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../INotificationsRepository';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notifications.push(notification);

    return notification;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const findNotification = this.notifications.find(
      notification => notification.id.toString() === id,
    );

    return findNotification;
  }

  public async findByRecipientId(
    recipient_id: string,
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      notification => notification.recipient_id === recipient_id,
    );

    return notifications;
  }

  public async save(notification: Notification): Promise<Notification> {
    const findIndex = this.notifications.findIndex(
      findNotification => findNotification.id === notification.id,
    );

    this.notifications[findIndex] = notification;

    return notification;
  }
}

export default FakeNotificationsRepository;
