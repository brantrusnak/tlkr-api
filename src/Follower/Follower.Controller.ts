import Model from './Follower.Model';
import { Request, Response } from 'express';
import UserController from '../User/User.Controller';

class FavoriteController {
  public async follow(req: Request, res: Response) {
    let followCheck = await Model.follower.findOne({
      where: { userId: req.user.id, followingUserId: req.params.userId }
    });
    if (!followCheck) {
      // Not following user
      UserController.modifyCount(req, res, 'increment', 'followingCount');
      UserController.modifyCount(
        req,
        res,
        'increment',
        'followersCount',
        req.params.userId
      );
      Model.follower.create({
        userId: req.user.id,
        followingUserId: req.params.userId
      });
      res.status(200).send({ status: true, message: 'Followed user' });
    } else {
      res.status(400).send({ status: false, message: 'Already following' });
    }
  }

  public async unfollow(req: Request, res: Response) {
    let followCheck = await Model.follower.findOne({
      where: { userId: req.user.id, followingUserId: req.params.userId }
    });
    if (followCheck) {
      // Following user
      UserController.modifyCount(req, res, 'decrement', 'followingCount');
      UserController.modifyCount(
        req,
        res,
        'decrement',
        'followersCount',
        req.params.userId
      );
      Model.follower.destroy({
        where: { userId: req.user.id, followingUserId: req.params.userId }
      });
      res.status(200).send({ status: true, message: 'Unfollowed user' });
    } else {
      res.status(400).send({ status: false, message: 'Not following user' });
    }
  }
}

export default new FavoriteController();
