import { Request, Response } from 'express';
import { UserDetails } from './UserDetails.Model';
import auth from '../Auth/Auth';

class UserDetailsController {
  public async create(userId: number, username: string, displayName: string, description: string): Promise<UserDetails> {
    try {
      // This will get called from User.create()
      const userDetails = new UserDetails({
        userId,
        username,
        displayName,
        description,
        postCount: 0,
        followersCount: 0,
        followingCount: 0,
        favoritesCount: 0,
      });
      return userDetails.save();
    } catch (error) {
      return error;
    }
  }

  public async updateCurrentUser(req: Request, res: Response) {
    try {
      let user = (req.user as {id: number});
      await UserDetails.update({...req.body}, {where: {id: user.id}});
      res.status(200).send({message: 'Updated user'});
    } catch (error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async getUser(req: Request, res: Response) {
    try{
      let data = auth.decodeToken(req.header('Authorization'));
      let user = await UserDetails.findByPk(data.id);
      res.status(200).send(user);
    } catch(error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async getUserById(req: Request, res: Response) {
    try{
      let user = await UserDetails.findByPk(req.params.userId);
      res.status(200).send(user);
    } catch(error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

}

export default new UserDetailsController();
