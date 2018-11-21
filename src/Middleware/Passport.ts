import UserModel from '../User/Model/UserModel';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

class Middleware {
  opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
  };

  public load(passport, app) {
    console.log(this.opts);
    passport.use(
      new Strategy(this.opts, async (payload, done) => {
        let id = await UserModel.findById(payload.id);
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
