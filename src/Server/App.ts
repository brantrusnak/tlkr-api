import * as express from 'express';
import routes from './Routes';
import { Database } from '../Database/Database';
import middleware from '../Middleware/Passport';

import * as cors from 'cors';
import * as parser from 'body-parser';
import * as passport from 'passport';

class App {
  public app: express.Application = express();
  private database = new Database();

  constructor() {
    this.init();
  }

  public init() {
    this.config();
    routes.load(this.app);
    this.database.init().then(() => console.log(`Server ready. Listening on http://${process.env.HOST}:${process.env.PORT}`));
  }

  public config(): void {
    middleware.load(passport, this.app);
    this.app.use(cors({ origin: true, exposedHeaders: 'Authorization', credentials: true }));
    this.app.use(passport.initialize());
    this.app.use(parser.urlencoded({ extended: false }));
    this.app.use(parser.json());
  }
}

export default new App().app;
