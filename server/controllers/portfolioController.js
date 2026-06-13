import Portfolio from '../models/Portfolio.js';

export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ projectDate: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ featured: true }).limit(6);
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ message: 'Portfolio deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
