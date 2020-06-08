import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/infra/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@email.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@email.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@email.com',
      old_password: '12345678',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@email.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
