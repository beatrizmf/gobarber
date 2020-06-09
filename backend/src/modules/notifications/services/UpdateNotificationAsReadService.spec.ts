import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import UpdateNotificationAsReadService from './UpdateNotificationAsReadService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let updateNotificationAsRead: UpdateNotificationAsReadService;

describe('UpdateNotificationAsRead', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();

    updateNotificationAsRead = new UpdateNotificationAsReadService(
      fakeNotificationsRepository,
    );
  });

  it('should be able to update a notification as read', async () => {
    const recipient_id = 'e0a06f01-6d63-49e4-9ef0-41393921d02a';

    let notification = await fakeNotificationsRepository.create({
      content: 'This is a test notification',
      recipient_id,
    });

    notification = await updateNotificationAsRead.execute(
      notification.id.toString(),
    );

    expect(notification.read).toBeTruthy();
  });

  it('should not be able to update a non existing notification as read', async () => {
    await expect(
      updateNotificationAsRead.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
