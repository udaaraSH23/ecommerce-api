const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Middleware to extract userId from WSO2 header
router.use((req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'User ID missing' });
  req.userId = userId;
  next();
});

router.get('/:productId', reviewController.getReviews);
router.post('/', reviewController.addReview);
router.put('/', reviewController.updateReview);
router.delete('/:productId', reviewController.deleteReview);

module.exports = router;
