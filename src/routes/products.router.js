import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';
import {
  hasAuthorizedRoleMiddleware,
  productAuthorizathionMiddleware,
} from '../middleware/auth.middleware.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', ProductsController.getAllProducts);

router.get('/:id', ProductsController.findProduct);

router.post(
  '/',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ProductsController.createNewProduct
);

router.put(
  '/:id',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin', 'premium']),
  productAuthorizathionMiddleware,
  ProductsController.updateProduct
);

router.delete(
  '/:id',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ProductsController.deleteProduct
);

export default router;
