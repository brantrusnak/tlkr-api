import * as jwt from 'jsonwebtoken';

class Auth {
  public createToken(id: number): string {
    return jwt.sign({ id: id }, process.env.SECRET_KEY, {
      expiresIn: `${process.env.SECRET_EXPIRES_IN_DAYS}d`
    });
  }
  // Not sure if we need these?
  public destroyToken() {}
  public refreshToken() {}
}

export default new Auth();
