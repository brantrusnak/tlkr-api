import Model from './Follower.Model';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import UserController from '../User/User.Controller';

class FavoriteController {
    // TODO:
    // Increment follower on params.userId

  public async follow(req: Request, res: Response) {
    let followCheck = await Model.follower.findOne({
      where: { userId: req.user.id, followingUserId: req.params.userId }
    });
    if (!followCheck) {
      // Not following user
      UserController.modifyCount(req, res, 'increment', 'followingCount');
      UserController.modifyCount(req, res, 'increment', 'followersCount', req.params.userId);
        Model.follower.create({userId: req.user.id, followingUserId: req.params.userId});
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
      UserController.modifyCount(req, res, 'decrement', 'followersCount', req.params.userId);
      Model.follower.destroy( {where: {userId: req.user.id, followingUserId: req.params.userId}});
      res.status(200).send({ status: true, message: 'Unfollowed user' });
    } else {
      res.status(400).send({ status: false, message: 'Not following user' });
    }
  }

  // public async favorite(req: Request, res: Response) {
  //     let favoriteCheck = await Model.favorite.findOne({where: {userId: req.user.id, postId: req.params.postId}});
  //     if(!favoriteCheck) {
  //         // Check if favorite doesn't already exist
  //         PostController.modifyCount(req, res, req.params.postId, 'increment');
  //         UserController.modifyCount(req, res, 'increment', 'favoritesCount');
  //         Model.favorite.create({userId: req.user.id, postId: req.params.postId});
  //         res.status(200).send({ status: true, message: 'Favorited post' });
  //     } else {
  //         res.status(400).send({status: false, message: 'Already favorited'});
  //     }
  // }

  // public async unfavorite(req: Request, res: Response) {
  //     let favoriteCheck = await Model.favorite.findOne({where: {userId: req.user.id, postId: req.params.postId}});
  //     if(favoriteCheck) {
  //         // Check if favorite exists
  //         PostController.modifyCount(req, res, req.params.postId, 'decrement');
  //         UserController.modifyCount(req, res, 'decrement', 'favoritesCount');
  //         Model.favorite.destroy({where: {userId: req.user.id, postId: req.params.postId}});
  //         res.status(200).send({ status: true, message: 'Unfavorited post' });
  //     } else {
  //         res.status(400).send({status: false, message: 'Post is not favored'});
  //     }
  // }
}

export default new FavoriteController();
