import * as express from 'express';
import routes from './Routes';
import database from '../Database/Database';

// TODO:
// Does this need imported/ran before initializing passport?
//import middleware from '../Middleware/Passport';

import * as cors from 'cors';
import * as parser from 'body-parser';
import * as passport from 'passport';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    routes.load(this.app);
    // TODO:
    // Use variable from env here
    database.init(true);
  }

  public config(): void {
    this.app.use(passport.initialize());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(passport.initialize());
    this.app.use(parser.urlencoded({ extended: false }));
    this.app.use(parser.json());
  }
}

export default new App().app;
