import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 13, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 14, 8, 0, 0),
    });

    const listAvailability = await listProviderMonthAvailability.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
    });

    expect(listAvailability).toEqual(
      expect.arrayContaining([
        {
          day: 13,
          available: false,
        },
        {
          day: 14,
          available: true,
        },
      ]),
    );
  });
});
