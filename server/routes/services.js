import express from 'express';
import * as serviceController from '../controllers/serviceController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.post('/', auth, serviceController.createService);
router.put('/:id', auth, serviceController.updateService);
router.delete('/:id', auth, serviceController.deleteService);

export default router;
