import * as express from 'express';
import Auth from './Auth';
const router = express.Router();

router.route('/login').post(Auth.login.bind(Auth));
router.route('/logout').get(Auth.logout.bind(Auth));

export default router;
