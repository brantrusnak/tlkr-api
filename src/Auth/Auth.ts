import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { User } from '../User/User.Model';
import UserController from '../User/User.Controller';
import { ValidationError } from 'sequelize';

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

class Auth {

  constructor() {}

  public createToken(id: number): string {
    return jwt.sign({ id: id }, process.env.SECRET_KEY, {
      expiresIn: `${process.env.SECRET_EXPIRES_IN_DAYS}d`
    });
  }

  public decodeToken(jwtToken: string): DecodedToken {
    return jwt.verify(jwtToken.split('Bearer ')[1], process.env.SECRET_KEY) as DecodedToken; // Is there a better way to remove 'Bearer '?
  }

  public async login(req: express.Request, res: express.Response) {
    try {
      let user = req.body;
      let storedUser = await User.findOne({ where: { username: user.username } });
      if (storedUser === null) {
        res.status(404).send({ message: 'Invalid username and/or password' });
      } else if (
        await UserController.comparePassword(
          user.password,
          storedUser['password']
        )
      ) {
        res.status(200).send({ message: 'Signed in', token: `Bearer ${this.createToken(storedUser['id'])}`});
      } else {
        res.status(401).send({ message: 'Invalid username and/or password' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ message: error.message });
      } else {
        res
          .status(500)
          .send({ message: 'Something went wrong!' });
      }
      throw error;
    }
  }

  public async logout(req: express.Request, res: express.Response) {
    res.clearCookie('jwt');
    res.status(200).send({ success: true });
  }
}

export default new Auth();
