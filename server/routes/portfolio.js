import express from 'express';
import * as portfolioController from '../controllers/portfolioController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', portfolioController.getPortfolios);
router.get('/featured/all', portfolioController.getFeaturedPortfolios);
router.get('/:id', portfolioController.getPortfolio);
router.post('/', auth, portfolioController.createPortfolio);
router.put('/:id', auth, portfolioController.updatePortfolio);
router.delete('/:id', auth, portfolioController.deletePortfolio);

export default router;
