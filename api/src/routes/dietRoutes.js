import { Router } from 'express';
import dietController from '../controllers/dietController.js';

const router = Router();

router.get('/', dietController.getAllDiets);

export default router;
