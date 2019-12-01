import Controller from './Favorite.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router
  .route('/favorite/:postId')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.favorite.bind(Controller)
  )
router.route('/unfavorite/:postId')
  .post(
    passport.authenticate('jwt', { session: false }),
    Controller.unfavorite.bind(Controller)
  );

export default router;
