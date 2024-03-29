import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findUserToken => findUserToken.token == token,
    );

    return userToken;
  }

  public async destroy(token: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      findUserToken => findUserToken.token == token,
    );

    delete this.userTokens[userTokenIndex];
  }
}

export default FakeUserTokensRepository;
