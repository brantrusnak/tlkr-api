import * as express from 'express';
import UserModel from '../Model/UserModel';
import * as sequelize from 'sequelize';
import Auth from '../../Auth/Auth';

class UserController {
  public async create(req: express.Request, res: express.Response) {
    let user = req.body;
    user.password = await UserModel.hash(user.password);
    try {
      await UserModel.user
        .findOrCreate({
          where: { username: user.username, email: user.email },
          defaults: {
            username: user.username,
            password: user.password,
            email: user.email
          }
        })
        .spread((user, created) => {
          created
            ? res.status(200).send({ message: 'User created' })
            : res.status(400).send({ message: 'User already exists' });
        });
    } catch (error) {
      if (error instanceof sequelize.ValidationError) {
        res.status(400).send({ message: 'Invalid or missing fields' });
        throw error;
      } else {
        res
          .status(500)
          .send({ status: false, message: 'Something went wrong!' });
      }
      throw error;
    }
  }

  public async login(req: express.Request, res: express.Response) {
    let user = req.body;
    let storedUser = await UserModel.user.findOne({
      where: { username: user.username }
    });

    if (storedUser === null) {
      res.status(404).send({ message: 'Username does not exist' });
    } else if (
      await UserModel.comparePassword(user.password, storedUser['password'])
    ) {
      let token = await Auth.createToken(storedUser['id']);
      res.cookie('jwt', token, {httpOnly: true});
      res.status(200).json({ success: true, token: token });
    } else {
      res.status(401).send({ message: 'Invalid username and/or password' });
    }
  }

  public async logout(req: express.Request, res: express.Response) {
    await res.clearCookie('jwt');
    res.status(200).send({ status: 'Logged out' });
  }

  public async get(req: express.Request, res: express.Response) {
    let result = await UserModel.findById(req.user.id);
    res.status(200).send({ response: result });
  }
}

export default new UserController();

//TODO:
// Implement these methods
// const update = async (req: express.Request, res: express.Response) => {
//   return true;
// };
// const disable = async (req: express.Request, res: express.Response) => {
//   return true;
// };

// export default router;
