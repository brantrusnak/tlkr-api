import UserRoutes from '../User/Routes/UserRoutes';
import * as express from 'express';

class Routes {
  app: express.Application;

  public load(app: express.Application) {
    this.app = app;
    this.registerUserRoutes();
  }

  private registerUserRoutes() {
    this.app.use('/', UserRoutes);
    console.log('Loaded User Routes');
  }
}

export default new Routes;
