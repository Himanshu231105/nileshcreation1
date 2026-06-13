import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, contactController.getContacts);
router.get('/:id', auth, contactController.getContact);
router.post('/', contactController.createContact);
router.delete('/:id', auth, contactController.deleteContact);

export default router;
