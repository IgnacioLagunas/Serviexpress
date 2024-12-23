import { Router } from 'express';
import ViewsController from '../controllers/views.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';
import { hasAuthorizedRoleMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', tokenValidationMiddleware, ViewsController.renderViewHome);
router.get('/home', tokenValidationMiddleware, ViewsController.renderViewHome);

router.get(
  '/profile',
  tokenValidationMiddleware,
  ViewsController.renderViewProfile
);
router.get(
  '/admin',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware('admin'),
  ViewsController.renderViewAdmin
);

router.get(
  '/servicio/:servicioId',
  tokenValidationMiddleware,
  ViewsController.renderViewServicio
);

router.get('/cart', tokenValidationMiddleware, ViewsController.renderViewCart);

// router.post(
//   '/purchase',
//   tokenValidationMiddleware,
//   ViewsController.renderViewPurchase
// );

router.get(
  '/login',
  // tokenValidationMiddleware,
  ViewsController.renderViewLogin
);

router.get('/signup', ViewsController.renderViewSignup);

router.get(
  '/reservas',
  tokenValidationMiddleware,
  ViewsController.renderViewReservas
);

router.get(
  '/change-password/:id/:token',
  ViewsController.renderViewChangePassword
);

router.get('/forgot-password', ViewsController.renderViewForgotPassword);

export default router;
