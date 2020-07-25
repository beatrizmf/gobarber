import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '2',
      provider_id: '1',
      date: new Date(2020, 4, 13, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '2',
      provider_id: '1',
      date: new Date(2020, 4, 13, 13, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 11).getTime());

    const listAvailability = await listProviderDayAvailability.execute({
      provider_id: '1',
      day: 13,
      month: 5,
      year: 2020,
    });

    expect(listAvailability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: false,
        },
        {
          hour: 12,
          available: true,
        },
        {
          hour: 13,
          available: false,
        },
      ]),
    );
  });
});
