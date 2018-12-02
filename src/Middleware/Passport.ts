import UserModel from '../User/Model/UserModel';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';

class Middleware {
  opts: StrategyOptions = {
    jwtFromRequest: this.cookieExtractor,
    secretOrKey: process.env.SECRET_KEY
  };

  cookieExtractor(req: Request): string {
    let token;
    if(req && req.get('cookie')) {
      let cookie = req.get('cookie');
      token = cookie.split('=')[1];
    }
    return token;
  }

  public load(passport, app) {
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
