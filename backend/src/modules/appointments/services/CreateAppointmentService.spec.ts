import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeNotificationRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 8).getTime());

    const appointment = await createAppointment.execute({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 13, 11),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id', 'provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 13, 11);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 8).getTime());

    await createAppointment.execute({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: appointmentDate,
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment on past', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 10).getTime());

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        provider_id: 'provider-id',
        date: new Date(2020, 4, 13, 8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 10).getTime());

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 13, 13),
        provider_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment out an interval from 8 am to 5 pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 12, 6).getTime());

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 13, 7),
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2020, 4, 13, 18),
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
