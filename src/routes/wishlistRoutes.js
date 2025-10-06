const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Middleware to extract userId from WSO2 header
router.use((req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'User ID missing' });
  req.userId = userId;
  next();
});

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;
