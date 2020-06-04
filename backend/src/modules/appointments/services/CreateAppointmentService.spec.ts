import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/infra/repositories/fakes/FakeAppointmentRepository';
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

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 13, 11),
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id', provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const provider_id = uuid();
    const date = new Date(2020, 5, 13, 11);

    await createAppointment.execute({
      date,
      provider_id,
    });

    expect(
      createAppointment.execute({
        date,
        provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
