import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
