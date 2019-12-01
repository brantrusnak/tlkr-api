import { Follow } from './Follow.Model';
import { Request, Response } from 'express';
import { UserDetails } from '../UserDetails/UserDetails.Model';

class FollowController {
  public async follow(req: Request, res: Response) {
    let user = (req.user as {id: number});
    let followCheck = await Follow.findOne({
      where: { userId: user.id, followingUserId: req.params.userId }
    });
    if (!followCheck) {
      // Not following user
      Follow.create({
        userId: user.id,
        followingUserId: req.params.userId
      });
      UserDetails.increment('followingCount', {by: 1, where: {id: user.id}});
      UserDetails.increment('followersCount', {by: 1, where: {id: req.params.userId}});
      res.status(200).send({message: 'Followed user'});
    } else {
      res.status(400).send({message: 'Already following'});
    }
  }

  public async unfollow(req: Request, res: Response) {
    let user = (req.user as {id: number});
    let followCheck = await Follow.findOne({
      where: { userId: user.id, followingUserId: req.params.userId }
    });
    if (followCheck) {
      // Following user
      Follow.destroy({
        where: { userId: user.id, followingUserId: req.params.userId }
      });
      UserDetails.increment('followingCount', {by: -1, where: {id: user.id}});
      UserDetails.increment('followersCount', {by: -1, where: {id: req.params.userId}});
      res.status(200).send({message: 'Unfollowed user'});
    } else {
      res.status(400).send({message: 'Not following user'});
    }
  }
}

export default new FollowController();
