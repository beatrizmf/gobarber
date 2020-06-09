import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async save(notification: Notification): Promise<Notification> {
    return this.ormRepository.save(notification);
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const notification = await this.ormRepository.findOne(id);

    return notification;
  }

  public async findByRecipientId(
    recipient_id: string,
  ): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({ recipient_id });

    return notifications;
  }
}

export default NotificationsRepository;
