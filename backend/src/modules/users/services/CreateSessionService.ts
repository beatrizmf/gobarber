import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/infra/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('incorrect email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
