import { Router } from 'express';
import passport from '../passport.js';
import {
  createNewTokenAndSendToCookieMiddleware,
  tokenValidationMiddleware,
} from '../middleware/jwt.middleware.js';
import ViewsController from '../controllers/views.controller.js';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.get(
  '/current',
  tokenValidationMiddleware,
  SessionsController.getCurrent
);

router.post(
  '/login',
  passport.authenticate('login', {
    session: false,
    failureRedirect: '/login',
  }),
  createNewTokenAndSendToCookieMiddleware,
  ViewsController.renderViewHome
);

router.post(
  '/signup',
  passport.authenticate('signup', {
    session: false,
    failureRedirect: '/login',
  }),
  createNewTokenAndSendToCookieMiddleware,
  ViewsController.renderViewHome
);

// SIGNUP - LOGIN- GOOGLE

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error',
    session: false,
  }),
  createNewTokenAndSendToCookieMiddleware,
  ViewsController.renderViewHome
);

// SIGNUP - LOGIN- GITHUB

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    failureMessage: true,
    session: false,
  }),
  createNewTokenAndSendToCookieMiddleware,
  ViewsController.renderViewHome
);

// SIGNOUT

// router.get('/signout', async (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/login');
//   });
// });
export default router;
