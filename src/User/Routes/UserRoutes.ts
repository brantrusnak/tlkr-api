import * as express from 'express';
const router = express.Router();
import User from './../Controller/UserController';
import * as passport from 'passport';


router.route('/register').post(User.create);

router.route('/login').post(User.login);

router.route('/logout').get(User.logout);

router
  .route('/user')
  .get(passport.authenticate('jwt', { session: false }), User.get);

export default router;
