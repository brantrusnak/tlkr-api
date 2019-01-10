import UserController from '../User/User.Controller';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

class Middleware {
  opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET_KEY
  };

  public load(passport, app) {
    passport.use(
      new Strategy(this.opts, async (payload, done) => {
        let id = await UserController.findById(payload.id);
        if (id) {
          return done(null, id);
        } else {
          return done(new Error('No id returned'), null);
        }
      })
    );

    app.use(passport.initialize());
  }
}

export default new Middleware();
