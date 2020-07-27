import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import CreateNotificationService from './CreateNotificationService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createNotification: CreateNotificationService;

describe('CreateNotification', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createNotification = new CreateNotificationService(
      fakeUsersRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to send a notification', async () => {
    const recipient = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    await createNotification.execute({
      recipient_id: recipient.id,
      content: 'test notification ✅',
    });

    const [notification] = await fakeNotificationsRepository.findByRecipientId(
      recipient.id,
    );

    expect(notification.content).toBe('test notification ✅');
  });

  it('should not be able to send a notification for a non exist user', async () => {
    await expect(
      createNotification.execute({
        recipient_id: 'non exist user',
        content: 'test notification ✅',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
