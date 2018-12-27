import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import UserModel from '../User/User.Model';
import UserController from '../User/User.Controller';

class Auth {
  public createToken(id: number): string {
    return jwt.sign({ id: id }, process.env.SECRET_KEY, {
      expiresIn: `${process.env.SECRET_EXPIRES_IN_DAYS}d`
    });
  }

  public async login(req: express.Request, res: express.Response) {
    let user = req.body;
    let storedUser = await UserModel.user.findOne({
      where: { username: user.username }
    });

    if (storedUser === null) {
      res
        .status(404)
        .send({ success: false, message: 'Username does not exist' });
    } else if (
      await UserController.comparePassword(
        user.password,
        storedUser['password']
      )
    ) {
      res.cookie('jwt', this.createToken(storedUser['id']), { httpOnly: true });
      res.status(200).json({ success: true });
    } else {
      res
        .status(401)
        .send({ success: false, message: 'Invalid username and/or password' });
    }
  }

  public async logout(req: express.Request, res: express.Response) {
    res.clearCookie('jwt');
    res.status(200).send({ success: true });
  }
}

export default new Auth();
