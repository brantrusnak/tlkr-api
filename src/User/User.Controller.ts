import { User } from './User.Model';

import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { ValidationError } from 'sequelize';
import UserDetailsController from '../UserDetails/UserDetails.Controller';

class UserController {
  private async hash(password: string): Promise<string> {
    return await hash(password, Number(process.env.HASH_ROUNDS));
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  public async findById(id: number) {
    return await User.findByPk(id);
  }

  public async create(req: Request, res: Response) {
    try {
      let input = req.body;
      input.password = await this.hash(input.password);

      let [user, created] = await User.findOrCreate({
        where: {username: input.username},
        defaults: {
          username: input.username,
          password: input.password
        }
      });

      if (created) {
        let details = await UserDetailsController.create(
          user.id,
          input.username,
          input.displayName,
          input.description
        );
        if (details) {
          res.status(200).send({message: 'User created'});
        } else {
          res.status(500).send({message: 'User already has details'});
        }
      } else {
        res.status(400).send({message: 'User already exists'});
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({message: error.message});
      } else {
        res.status(500).send({message: 'Something went wrong!'});
      }
      throw error;
    }
  }
}

export default new UserController();