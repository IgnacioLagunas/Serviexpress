import config from '../config/config.js';
import { EntitiyNotFoundError, MissingDataError } from '../errors/errors.js';
import usersService from '../services/users.service.js';
import { generateNewToken, verifyToken } from '../utils/jwt.utils.js';
import passport from 'passport';
import { logger } from '../utils/logger.utils.js';
import { updateLastConnection } from '../utils/users.utils.js';

export const tokenValidationMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // Si hay un error o el usuario no existe, redirige a la página de inicio de sesión
      return res.redirect('/login');
    }
    // Si el usuario existe, agrega la información del usuario al objeto req
    req.user = user;
    updateLastConnection(user);
    return next();
  })(req, res, next);
};

export const createNewTokenAndSendToCookieMiddleware = (req, res, next) => {
  try {
    const token = generateNewToken(req.user);
    logger.info('JWT Token: ', token);
    console.log(token);
    res.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    updateLastConnection(req.user);
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// export const putTokenInAuthHeadersMiddleware = (req, res, next) => {
//   try {
//     const { token } = req.params;
//     if (!token) throw new MissingDataError();
//     req.headers['authorization'] = `Bearer ${token}`;
//     next();
//   } catch (error) {
//     res.status(error.code || 500).json({ message: error.message });
//   }
// };

export const checkTokenForPasswordChangeMiddleware = async (req, res, next) => {
  try {
    const { token, id } = req.params;
    if (!token || !id) {
      throw new MissingDataError();
    }
    const user = await usersService.findOne(id);
    if (!user) {
      throw new EntitiyNotFoundError(`User with id ${id}`);
    }
    const decoded = verifyToken(token, config.JWT_SECRET + user.password || '');
    logger.info('Jwt token payload: ', decoded);
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};
