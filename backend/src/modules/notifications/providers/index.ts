import { container } from 'tsyringe';

import INotificationsRepository from '../repositories/INotificationsRepository';
import NotificationsRepository from '../infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
