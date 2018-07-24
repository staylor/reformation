import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default function addPassport(app) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          req => {
            let token = null;
            if (req && req.cookies) {
              token = req.cookies[process.env.TOKEN_KEY];
            }
            return token;
          },
        ]),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      (jwtPayload, done) => {
        if (!jwtPayload.userId) {
          done(new Error('No userId in JWT'), false);
        } else {
          done(null, jwtPayload);
        }
      }
    )
  );

  app.use(passport.initialize());
}
