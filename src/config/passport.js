import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import { isValidPassword } from "../utils/bcrypt.js";

// Estrategia Local para login
passport.use("login", new LocalStrategy(
  { usernameField: "email", passwordField: "password", session: false },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !isValidPassword(password, user.password)) {
        return done(null, false, { message: "Credenciales inválidas" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Estrategia JWT para extraer el usuario desde la cookie
passport.use("jwt", new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.token; // extrae token de cookie
        }
        return token;
      }
    ]),
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user); // Devuelve el usuario
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
