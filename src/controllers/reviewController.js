const reviewService = require('../services/reviewService');

exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsForProduct(productId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, rating, comment } = req.body;
    const review = await reviewService.addReview(userId, productId, rating, comment);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, rating, comment } = req.body;
    const updated = await reviewService.updateReview(userId, productId, rating, comment);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const deleted = await reviewService.deleteReview(userId, productId);
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
