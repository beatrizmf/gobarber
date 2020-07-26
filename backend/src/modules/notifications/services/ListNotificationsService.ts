import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Notification from '../infra/typeorm/schemas/Notification';

import INotificationsRepository from '../repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListNotificationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(recipient_id: string): Promise<Notification[]> {
    const recipient = await this.usersRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('recipient does not exist');
    }

    const notifications = await this.notificationsRepository.findByRecipientId(
      recipient.id,
    );

    return notifications;
  }
}

export default ListNotificationsService;
