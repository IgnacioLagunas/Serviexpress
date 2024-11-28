import { Router } from 'express';
import TestsController from '../controllers/tests.controller.js';

const router = Router();

router.get('/logger', TestsController.testLoggers);

export default router;
