const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware to extract userId from header injected by WSO2
router.use((req, res, next) => {
  const userId = req.headers['x-user-id']; // WSO2 injects this
  if (!userId) return res.status(401).json({ error: 'User ID missing' });
  req.userId = userId;
  next();
});

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/', cartController.updateCartItem);
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
