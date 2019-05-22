import Model from './UserDetails.Model';
import { Request, Response } from 'express';

class UserDetailsController {

  public async findById(id: number) {
    return await Model.userDetails.findByPk(id);
  }

  public async create(user: {id:number, username: string}, input: {displayName?: string, location?: string, description?: string}) {
    try {
      return await Model.userDetails.findOrCreate({
        where: {userId: user.id},
        defaults: {
          userId: user.id,
          displayName: input.displayName || user.username,
          location: input.location || '',
          description: input.description || '',
          postCount: 0,
          followersCount: 0,
          followingCount: 0,
          favoritesCount: 0
        }
      }).spread((details, created) => created ? details : false)
    } catch (error) {
      return error;
    }
  }

  public async get(req: Request, res: Response) {
    let result = await this.findById(req.user.id);
    res.status(200).send({ response: result });
  }

  public async update(req: Request, res: Response) {
    try {
      await Model.userDetails.update(
        { ...req.body },
        { where: { id: req.user.id } }
      );
      res.status(200).send({ status: true, message: 'Updated user' });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
      throw error;
    }
  }

  public async getById(req: Request, res: Response) {
    try{
      let user = await Model.userDetails.findByPk(req.params.userId);
      if (user) {
        res.status(200).send({response: user['dataValues']});
      } else {
        res.status(400).send({ status: false, message: 'Could not find user' });
      }
    } catch(error) {
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
    let currentInfo = await Model.userDetails.findByPk(userId || req.user.id);
    switch (operation) {
      case 'increment': {
        await Model.userDetails.update(
          {
            ...currentInfo['dataValues'],
            [field]: currentInfo['dataValues'][field] += 1
          },
          { where: { id: userId || req.user.id } }
        );
        break;
      }
      case 'decrement': {
        await Model.userDetails.update(
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

export default new UserDetailsController();
