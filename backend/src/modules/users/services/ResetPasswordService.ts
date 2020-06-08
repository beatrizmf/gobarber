import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/infra/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exists');
    }

    const tokenCreatedAt = new Date(userToken.created_at);
    const now = new Date(Date.now());

    if (differenceInHours(now, tokenCreatedAt) > 2) {
      throw new AppError('token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default SendForgotPasswordEmailService;
