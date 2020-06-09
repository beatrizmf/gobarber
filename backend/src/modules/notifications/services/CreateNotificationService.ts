import { injectable, inject } from 'tsyringe';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  recipient_id: string;
  content: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    content,
    recipient_id,
  }: IRequest): Promise<Notification> {
    const recipient = await this.usersRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('recipient does not exist');
    }

    const notification = await this.notificationsRepository.create({
      recipient_id,
      content,
    });

    await this.cacheProvider.invalidate(`notifications:${recipient.id}`);

    return notification;
  }
}

export default CreateNotificationService;
