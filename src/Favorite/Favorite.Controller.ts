import Model from './Favorite.Model';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import UserDetailsController from '../UserDetails/UserDetails.Controller';
import PostController from '../Posts/Post.Controller';

class FavoriteController {
  public async favorite(req: Request, res: Response) {
    let favoriteCheck = await Model.favorite.findOne({
      where: { userId: req.user.id, postId: req.params.postId }
    });
    if (!favoriteCheck) {
      // Check if favorite doesn't already exist
      PostController.modifyCount(req, res, req.params.postId, 'increment');
      UserDetailsController.modifyCount(req, res, 'increment', 'favoritesCount');
      Model.favorite.create({ userId: req.user.id, postId: req.params.postId });
      res.status(200).send({ status: true, message: 'Favorited post' });
    } else {
      res.status(400).send({ status: false, message: 'Already favorited' });
    }
  }

  public async unfavorite(req: Request, res: Response) {
    let favoriteCheck = await Model.favorite.findOne({
      where: { userId: req.user.id, postId: req.params.postId }
    });
    if (favoriteCheck) {
      // Check if favorite exists
      PostController.modifyCount(req, res, req.params.postId, 'decrement');
      UserDetailsController.modifyCount(req, res, 'decrement', 'favoritesCount');
      Model.favorite.destroy({
        where: { userId: req.user.id, postId: req.params.postId }
      });
      res.status(200).send({ status: true, message: 'Unfavorited post' });
    } else {
      res.status(400).send({ status: false, message: 'Post is not favored' });
    }
  }
}

export default new FavoriteController();
