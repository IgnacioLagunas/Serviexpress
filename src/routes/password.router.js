import { Router } from 'express';
import PasswordController from '../controllers/passwordChange.controller.js';
import ViewsController from '../controllers/views.controller.js';
import { checkTokenForPasswordChangeMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.post('/forgot', PasswordController.sendRecoveryEmail);

router.get(
  '/change/:id/:token',
  checkTokenForPasswordChangeMiddleware,
  ViewsController.renderViewChangePassword
);

router.post(
  '/change/:id/:token',
  checkTokenForPasswordChangeMiddleware,
  PasswordController.changePassword
);

export default router;
