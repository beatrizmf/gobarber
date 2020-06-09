import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  findById(id: string): Promise<Notification | undefined>;
  findByRecipientId(recipient_id: string): Promise<Notification[]>;
  save(notification: Notification): Promise<Notification>;
}
