import { Router } from 'express';
import ServiciosController from '../controllers/servicios.controller.js';
import {
  hasAuthorizedRoleMiddleware,
  productAuthorizathionMiddleware,
} from '../middleware/auth.middleware.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', ServiciosController.getAll);

router.get('/:id', ServiciosController.findOne);

router.post(
  '/',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ServiciosController.createOne
);

router.put(
  '/:id',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  // productAuthorizathionMiddleware,
  ServiciosController.updateOne
);

router.delete(
  '/:id',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ServiciosController.deleteOne
);

export default router;
