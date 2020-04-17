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
  .route('/user')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.getUser.bind(Controller)
  )

  router
  .route('/user/id/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.getUserById.bind(Controller)
  )

router
  .route('/user/username/:username')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.getUserByUsername.bind(Controller)
  )

export default router;
