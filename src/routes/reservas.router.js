import { Router } from 'express';
import ReservasController from '../controllers/reservas.controller.js';
import {
  hasAuthorizedRoleMiddleware,
  productAuthorizathionMiddleware,
} from '../middleware/auth.middleware.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', ReservasController.getAll);

router.get('/usuario/:id', ReservasController.getByUser);

router.get('/:id', ReservasController.findOne);

router.post(
  '/:usuario_id/:servicio_id',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ReservasController.createOne
);

router.put(
  '/:id',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  // productAuthorizathionMiddleware,
  ReservasController.updateOne
);

router.delete(
  '/:id',
  // tokenValidationMiddleware,
  // hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ReservasController.deleteOne
);

export default router;
