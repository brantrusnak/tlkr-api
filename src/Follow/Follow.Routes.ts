import Controller from './Follow.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router
  .route('/follow/:userId')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.follow.bind(Controller)
  );

router.route('/unfollow/:userId')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.unfollow.bind(Controller)
  );

export default router;
