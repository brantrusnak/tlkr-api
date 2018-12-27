import Controller from './User.Controller';
import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';

router.route('/register').post(Controller.create.bind(Controller));

router
  .route('/user')
  .get(
    passport.authenticate('jwt', { session: false }),
    Controller.get.bind(Controller)
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    Controller.update.bind(Controller)
  );

export default router;

router.route('/user');
