import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeNotificationsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user and', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be send a new notification when user is created', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    const [notification] = await fakeNotificationsRepository.findByRecipientId(
      user.id,
    );

    expect(notification.content).toBe('You have registered with GoBarber! 🎉');
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user whit same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
