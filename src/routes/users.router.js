import { Router } from 'express';
import upload from '../middleware/multer.middleware.js';
import UsersController from '../controllers/users.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';
import { hasAuthorizedRoleMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', UsersController.getAllUsers);
router.get('/:email', UsersController.getUserByEmail);

router.get('/:id', UsersController.findUserById);

router.post('/', UsersController.createNewUser);

router.post(
  '/documents',
  tokenValidationMiddleware,
  upload.fields([
    { name: 'dni', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'bank', maxCount: 1 },
  ]),
  UsersController.saveUserDocuments
);

router.put(
  '/:id',
  //  tokenValidationMiddleware,
  UsersController.updateUser
);

router.put(
  '/:role/:id',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin']),
  UsersController.upgradeOrDowngradeUser
);

router.delete(
  '/innactive',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin']),
  UsersController.deleteInnactiveUsers
);

router.delete('/:id', UsersController.deleteUser);

export default router;
