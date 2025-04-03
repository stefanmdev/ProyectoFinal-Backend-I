import passport from "passport";
import local from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import { isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  // Estrategia login local
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !isValidPassword(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Estrategia JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload.id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default initializePassport;
