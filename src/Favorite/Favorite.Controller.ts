import { Request, Response } from 'express';
import { Favorite } from './Favorite.Model';
import { Post } from '../Post/Post.Model';

class FavoriteController {
  public async favorite(req: Request, res: Response) {
    let user = (req.user as {id: number});
    let favoriteCheck = await Favorite.findOne({
      where: { userId: user.id, postId: req.params.postId }
    });
    if (!favoriteCheck) {
      Favorite.create({ userId: user.id, postId: req.params.postId });
      Post.increment('favoriteCount', {by: 1, where: {id: req.params.postId}})
      res.status(200).send({message: 'Favorited post'});
    } else {
      res.status(400).send({message: 'Already favorited'});
    }
  }

  public async unfavorite(req: Request, res: Response) {
    let user = (req.user as {id: number});
    let favoriteCheck = await Favorite.findOne({
      where: { userId: user.id, postId: req.params.postId }
    });
    if (favoriteCheck) {
      // Check if favorite exists
      Favorite.destroy({where: { userId: user.id, postId: req.params.postId }});
      Post.increment('favoriteCount', {by: -1, where: {id: req.params.postId}})
      res.status(200).send({message: 'Unfavorited post'});
    } else {
      res.status(400).send({message: 'Post is not favored'});
    }
  }
}

export default new FavoriteController();
