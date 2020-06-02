import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/infra/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.director, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
