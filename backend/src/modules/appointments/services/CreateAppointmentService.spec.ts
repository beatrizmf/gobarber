import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const provider_id = uuid();

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 8).getTime());

    const appointment = await createAppointment.execute({
      user_id: '1',
      provider_id,
      date: new Date(2020, 5, 13, 11),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id', provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const provider_id = uuid();
    const appointmentDate = new Date(2020, 5, 13, 11);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 8).getTime());

    await createAppointment.execute({
      user_id: '1',
      provider_id,
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        user_id: '1',
        date: appointmentDate,
        provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointments on past', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 10).getTime());

    const provider_id = uuid();

    await expect(
      createAppointment.execute({
        user_id: '1',
        date: new Date(2020, 4, 13, 8),
        provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
