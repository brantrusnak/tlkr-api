import Controller from './User.Controller';
import * as express from 'express';
const router = express.Router();

router.route('/register').post(Controller.create.bind(Controller));

export default router;