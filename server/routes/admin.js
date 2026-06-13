import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.get('/profile', auth, adminController.getAdmin);

export default router;
