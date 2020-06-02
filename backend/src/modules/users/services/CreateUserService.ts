import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/infra/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('email address alredy used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
