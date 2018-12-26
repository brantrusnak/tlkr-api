import * as express from 'express';
import routes from './Routes';
import database from '../Database/Database';
import middleware from '../Middleware/Passport';

import * as cors from 'cors';
import * as parser from 'body-parser';
import * as passport from 'passport';

class App {
  public app: express.Application = express();

  constructor() {
    this.init();
  }

  public init() {
    this.config();
    routes.load(this.app);
    database.init();
  }

  public config(): void {
    middleware.load(passport, this.app);
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(passport.initialize());
    this.app.use(parser.urlencoded({ extended: false }));
    this.app.use(parser.json());
  }
}

export default new App().app;
