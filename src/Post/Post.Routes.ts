import Controller from './Post.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router
  .route('/post')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.createPost.bind(Controller)
  );

router
  .route('/post/:postId')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.getPost.bind(Controller)
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    Controller.deletePost.bind(Controller)
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.showcasePost.bind(Controller)
  );

router
  .route('/posts/:userId')
  .get(
    passport.authenticate('jwt', {session: false}),
    Controller.getAllByUser.bind(Controller)
  );

export default router;
