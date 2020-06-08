import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const cachedUserProfile = await this.cacheProvider.recover<User>(
      `user-profile:${user_id}`,
    );

    if (cachedUserProfile) {
      return cachedUserProfile;
    }

    const userProfile = await this.usersRepository.findById(user_id);

    if (!userProfile) {
      throw new AppError('user not found');
    }

    await this.cacheProvider.save(`user-profile:${user_id}`, userProfile);

    return userProfile;
  }
}

export default ShowProfileService;
