import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/:cartId', tokenValidationMiddleware, CartsController.getCart);

router.post('/', tokenValidationMiddleware, CartsController.createCart);

router.post(
  '/:cid/purchase',
  tokenValidationMiddleware,
  CartsController.purchaseCart
);

router.put(
  '/:cartId/product/:productId',
  tokenValidationMiddleware,
  CartsController.updateCart
);

router.delete(
  '/:cartId',
  tokenValidationMiddleware,
  CartsController.deleteCart
);

router.delete(
  '/:cartId/product/:productId',
  tokenValidationMiddleware,
  CartsController.deleteProductFromCart
);
export default router;
