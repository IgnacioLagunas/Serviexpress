import { Router } from 'express';
import upload from '../middleware/multer.middleware.js';
import UsuariosController from '../controllers/usuarios.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';
import { hasAuthorizedRoleMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', UsuariosController.getAllUsers);
router.get('/:email', UsuariosController.getUserByEmail);

router.get('/:id', UsuariosController.findUserById);

router.post('/', UsuariosController.createNewUser);

router.post(
  '/documents',
  tokenValidationMiddleware,
  upload.fields([
    { name: 'dni', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'bank', maxCount: 1 },
  ]),
  UsuariosController.saveUserDocuments
);

router.put(
  '/:id',
  //  tokenValidationMiddleware,
  UsuariosController.updateUser
);

router.put(
  '/:role/:id',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin']),
  UsuariosController.upgradeOrDowngradeUser
);

router.delete(
  '/innactive',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin']),
  UsuariosController.deleteInnactiveUsers
);

router.delete('/:id', UsuariosController.deleteUser);

export default router;
