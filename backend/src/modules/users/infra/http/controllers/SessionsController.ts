import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
