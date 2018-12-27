import Model from './User.Model';
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
    try {
      let user = req.body;
      user.password = await this.hash(user.password);
      let status = await Model.user.findOrCreate({
        where: { username: user.username, email: user.email },
        defaults: {
          username: user.username,
          password: user.password,
          email: user.email,
          displayName: user.displayName,
          location: user.location || '',
          description: user.description || '',
          postCount: 0,
          followersCount: 0,
          followingCount: 0,
          favoritesCount: 0
        }
      });
      // status[1] is true if created, false if existing
      status[1]
        ? res.status(200).send({ status: true, message: 'User created' })
        : res
            .status(400)
            .send({ status: false, message: 'User already exists' });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ status: false, message: error.message });
      } else {
        res
          .status(500)
          .send({ status: false, message: 'Something went wrong!' });
      }
      throw error;
    }
  }

  public async get(req: Request, res: Response) {
    let result = await this.findById(req.user.id);
    res.status(200).send({ response: result });
  }

  public async update(req: Request, res: Response) {
    try {
      // TODO:
      // Maybe rework this? Restrict to only displayName, description, and location?
      // Could update username / unhashed password...
      let update = await Model.user.update(
        { ...req.body },
        { where: { id: req.user.id } }
      );
      res.status(200).send({ status: true, message: 'Updated user' });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
      throw error;
    }
  }

  public async modifyCount(
    req: Request,
    res: Response,
    operation: 'increment' | 'decrement',
    field: 'postCount' | 'followersCount' | 'followingCount' | 'favoritesCount',
    userId?: number
  ) {
    let currentInfo = await Model.user.findByPk(userId || req.user.id);
    switch (operation) {
      case 'increment': {
        await Model.user.update(
          {
            ...currentInfo['dataValues'],
            [field]: currentInfo['dataValues'][field] += 1
          },
          { where: { id: userId || req.user.id } }
        );
        break;
      }
      case 'decrement': {
        await Model.user.update(
          {
            ...currentInfo['dataValues'],
            [field]: currentInfo['dataValues'][field] -= 1
          },
          { where: { id: userId || req.user.id } }
        );
        break;
      }
      default: {
        throw new Error('Invalid Switch/Case Operation');
      }
    }
  }
}

export default new UserController();

//TODO:
// Implement these methods
// const disable = async (req: express.Request, res: express.Response) => {
//   return true;
// };
