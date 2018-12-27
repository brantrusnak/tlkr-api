import Model from './Post.Model';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import UserController from '../User/User.Controller';

class PostController {
  public async get(req: Request, res: Response) {
    try {
      let post = await Model.post.findByPk(req.params.postId);
      console.log(post);
      if (post) {
        res.status(200).send({ status: true, message: post['dataValues'] });
      } else {
        res.status(400).send({ status: false, message: 'Could not find post' });
      }
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

  public async create(req: Request, res: Response) {
    try {
      let create = await Model.post.create({
        text: 'Hello!',
        favoriteCount: 0,
        postedBy: req.user.id,
        isShowcase: false
      });
      res.status(200).send({ status: true, message: 'Created post' });
      UserController.modifyCount(req, res, 'increment', 'postCount');
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

  public async delete(req: Request, res: Response) {
    try {
      let deleted = await Model.post.destroy({
        where: { id: req.params.postId, postedBy: req.user.id }
      });
      if (deleted === 0) {
        // Post doesn't exist or is not owned by user
        res
          .status(400)
          .send({ status: false, message: 'Could not delete post' });
      } else {
        res.status(200).send({ status: true, message: 'Deleted post' });
        UserController.modifyCount(req, res, 'decrement', 'postCount');
      }
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

  public async showcase(req: Request, res: Response) {
    try {
      let currentShowcase = await Model.post.findOne({
        where: { postedBy: req.user.id, isShowcase: true }
      });
      let newShowcase = await Model.post.findOne({
        where: { postedBy: req.user.id, id: req.params.postId }
      });

      if (currentShowcase) {
        await Model.post.update(
          { ...currentShowcase['dataValues'], isShowcase: false },
          { where: { id: currentShowcase['dataValues']['id'] } }
        );
      }
      if (newShowcase) {
        await Model.post.update(
          { ...newShowcase['dataValues'], isShowcase: true },
          { where: { id: newShowcase['dataValues']['id'] } }
        );
        res.status(200).send({ status: true, message: 'Set showcase' });
      } else {
        res
          .status(400)
          .send({ status: false, message: 'Something went wrong!' });
      }
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

  public async modifyCount(req: Request, res: Response, postId: number, operation: 'increment' | 'decrement') {
    let currentPost = await Model.post.findOne({
      where: { id: postId }
    });

    switch (operation) {
      case 'increment': {
        await Model.post.update({...currentPost['dataValues'], favoriteCount: currentPost['dataValues']['favoriteCount'] += 1}, {where: {id: postId}});
        break;
      }
      case 'decrement': {
        await Model.post.update({...currentPost['dataValues'], favoriteCount: currentPost['dataValues']['favoriteCount'] -= 1}, {where: {id: postId}});
        break;
      }
      default: {
        throw new Error('Invalid Switch/Case Operation');
      }
    }
  }

}

export default new PostController();
