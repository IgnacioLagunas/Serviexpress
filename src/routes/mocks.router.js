import { Router } from 'express';
import MocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/products', MocksController.getMockedProducts);

export default router;
