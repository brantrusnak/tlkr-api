import UserRoutes from '../User/Routes/UserRoutes';

class Routes {
  public load(app) {
    this.registerUserRoutes(app);
  }

  private registerUserRoutes(app) {
    app.use('/', UserRoutes);
    console.log('Loaded User Routes');
  }
}

export default new Routes();
