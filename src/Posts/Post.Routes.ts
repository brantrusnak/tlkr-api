import Controller from './Post.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router
  .route('/post')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.create.bind(Controller)
  );

router
  .route('/post/:postId')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.get.bind(Controller)
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    Controller.delete.bind(Controller)
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.showcase.bind(Controller)
  );

router
  .route('/posts')
  .get(
    passport.authenticate('jwt', {session: false}),
    Controller.getAll.bind(Controller)
  );

export default router;
