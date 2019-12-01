import { Post } from './Post.Model';
import { UserDetails } from '../UserDetails/UserDetails.Model';
import { Request, Response } from 'express';

class PostController {

  public async createPost(req: Request, res: Response) {
    try {
      let user = (req.user as {id: number});
      await Post.create({
        text: req.body.text,
        favoriteCount: 0,
        postedBy: user.id,
        isShowcase: false
      });
      UserDetails.increment('postCount', {by: 1, where: {id: user.id}});
      res.status(200).send({message: 'Created post'});
    } catch (error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async getPost(req: Request, res: Response) {
    try {
      let post = await Post.findByPk(req.params.postId);
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async deletePost(req: Request, res: Response) {
    try {
      let user = (req.user as {id: number});
      let numDestroyed = await Post.destroy({ where: { id: req.params.postId, postedBy: user.id} })
      if(numDestroyed !== 0) {
        UserDetails.increment('postCount', {by: -1, where: {id: user.id}});
        res.status(200).send({message: 'Deleted post'});
      } else {
        res.status(400).send({message: 'Could not delete post'});
      }
    } catch (error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async showcasePost(req: Request, res: Response) {
    try {
      let user = (req.user as {id: number});
      let currentShowcase = await Post.findOne({where: { postedBy: user.id, isShowcase: true }})
      let newShowcase = await Post.findOne({where: { postedBy: user.id, id: req.params.postId }});
      if(currentShowcase) {
        await Post.update({...currentShowcase, isShowcase: false}, {where: {id: currentShowcase.id}})
      }
      if(newShowcase) {
        await Post.update({...newShowcase, isShowcase: true}, {where: {id: newShowcase.id}});
        res.status(200).send({message: 'Set showcase' });
      }
    } catch (error) {
      res.status(400).send({message: error.message});
      throw error;
    }
  }

  public async getAllByUser(req: Request, res: Response) {
    try {
      let posts = await Post.findAll({ where: {postedBy: req.params.userId}});
      if (posts.length !== 0) {
        res.status(200).send({posts});
      } else {
        res.status(400).send({message: 'Could not find posts'});
      }
    } catch (error) {
      
    }
  }

}

export default new PostController();
