import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response) {
    const { password, token } = req.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token,
    });

    return res.status(204).json();
  }
}
