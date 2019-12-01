import Controller from './UserDetails.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router
  .route('/user')
  .put(
    passport.authenticate('jwt', { session: false }),
    Controller.updateCurrentUser.bind(Controller)
  );

router
  .route('/user/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.getUserById.bind(Controller)
  )

export default router;
