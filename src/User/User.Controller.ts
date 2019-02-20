import Model from './User.Model';
import UserDetailsController from '../UserDetails/UserDetails.Controller';
import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { ValidationError } from 'sequelize';

class UserController {
  private async hash(password: string): Promise<string> {
    return await hash(password, Number(process.env.HASH_ROUNDS));
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  public async findById(id: number) {
    return await Model.user.findByPk(id);
  }

  public async create(req: Request, res: Response) {
    console.log(req.body);
    try {
      let input = req.body;
      input.password = await this.hash(input.password);

      let user = await Model.user
        .findOrCreate({
          where: { username: input.username, email: input.email },
          defaults: {
            username: input.username,
            password: input.password,
            email: input.email
          }
        })
        .spread((user, created) => (created ? user : false));

      if (user) {
        let details = await UserDetailsController.create(
          user['dataValues'],
          input
        );
        if (details) {
          res.status(200).send({ message: 'User created' });
        } else {
          res.status(500).send({ message: 'User already has details' });
        }
      } else {
        res.status(400).send({ message: 'User already exists' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Something went wrong!' });
      }
      throw error;
    }
  }
}

export default new UserController();