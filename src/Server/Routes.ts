import * as express from 'express';
import UserRoutes from '../User/User.Routes';
import AuthRoutes from '../Auth/Auth.Routes';
import PostRoutes from '../Posts/Post.Routes';
import FavoriteRoutes from '../Favorite/Favorite.Routes';
import FollowerRoutes from '../Follower/Follower.Routes';

class Routes {
  app: express.Application;

  public load(app: express.Application) {
    this.app = app;
    this.registerAuthRoutes();
    this.registerUserRoutes();
    this.registerPostRoutes();
    this.registerFavoriteRoutes();
    this.registerFollowerRoutes();
  }

  private registerAuthRoutes() {
    this.app.use('/', AuthRoutes);
    console.log('Loaded Auth Routes');
  }

  private registerUserRoutes() {
    this.app.use('/', UserRoutes);
    console.log('Loaded User Routes');
  }

  private registerPostRoutes() {
    this.app.use('/', PostRoutes);
    console.log('Loaded Post Routes');
  }

  private registerFavoriteRoutes() {
    this.app.use('/', FavoriteRoutes);
    console.log('Loaded Favorite Routes');
  }

  private registerFollowerRoutes() {
    this.app.use('/', FollowerRoutes);
    console.log('Loaded Favorite Routes');
  }
}

export default new Routes();
