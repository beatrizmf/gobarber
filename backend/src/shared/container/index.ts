import { container } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/infra/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
