import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import UsersService from './services/users.service.js';
import { isPasswordValid } from './utils/password.utils.js';
import config from './config/config.js';

// JWT Strategy

const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

let opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UsersService.findOneByEmail(jwt_payload.email);
      if (!user) {
        return done(null, false);
      }
      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Estrategia local

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await UsersService.findOneByEmail(username);
        if (!user) {
          return done(null, false);
        }
        // Logica de verificacion de password
        if (!isPasswordValid(user, password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      try {
        const user = await UsersService.findOneByEmail(username);
        if (user) {
          return done(null, false, {
            message: `User ${username} already exists.`,
          });
        }
        const newUser = await UsersService.createOne(req.body);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google - passport

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      // Al resolver el callback, si todo sale bien con google se implementa esta logica
      const { _json: googleUser } = profile;
      try {
        const userInDB = await UsersService.findOneByEmail(googleUser.email);
        if (!userInDB) {
          const {
            given_name: first_name,
            family_name: last_name,
            email,
          } = googleUser;
          const newUser = await UsersService.createOne({
            first_name,
            last_name,
            email: email.toLowerCase(),
          });
          done(null, newUser);
        } else done(null, userInDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GitHub-Passport Strategy

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName: name, emails } = profile;
      if (!emails || emails.length == 0) {
        return done(null, null, {
          message:
            'Email no encontrado. Por favor revise su configuración de github para permitir a la app la recuperación de email o intente registrarse mediante otro método!',
        });
      }
      const email = emails[0].value;
      try {
        const user = await UsersService.findOneByEmail(email);
        if (!user) {
          const [first_name, last_name] = name.split(' ');
          const newUser = await UsersService.createOne({
            first_name,
            last_name,
            email,
          });
          return done(null, newUser);
        } else return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
