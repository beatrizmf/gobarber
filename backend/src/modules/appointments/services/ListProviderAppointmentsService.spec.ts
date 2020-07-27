import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all appointments in day from provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 4, 13, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 4, 13, 13, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 13,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });

  it('should be able to list all cached appointments in day from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 4, 13, 8, 0, 0),
    });

    await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 13,
      month: 5,
      year: 2020,
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 13,
      month: 5,
      year: 2020,
    });

    expect(appointments[0]).toBeTruthy();
  });
});
