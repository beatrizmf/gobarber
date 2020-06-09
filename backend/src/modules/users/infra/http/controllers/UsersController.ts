import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';

export default class UsersController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const createNotification = container.resolve(CreateNotificationService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    await createNotification.execute({
      recipient_id: user.id,
      content: 'You have registered with GoBarber! 🎉',
    });

    return res.json(classToClass(user));
  }
}
