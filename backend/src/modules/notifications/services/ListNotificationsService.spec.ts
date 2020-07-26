import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import ListNotificationsService from './ListNotificationsService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let listNotificationsService: ListNotificationsService;

describe('ListNotificationsService', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listNotificationsService = new ListNotificationsService(
      fakeUsersRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to list notifications from a user', async () => {
    const recipient = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    await fakeNotificationsRepository.create({
      content: 'This is a test notification',
      recipient_id: recipient.id,
    });

    const notifications = await listNotificationsService.execute(recipient.id);

    expect(notifications).toBeTruthy();
  });

  it('should not be able to list notifications from a non existing user', async () => {
    await expect(
      listNotificationsService.execute('non-existing-user'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
