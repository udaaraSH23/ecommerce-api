const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Middleware to extract userId from WSO2 header
router.use((req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'User ID missing' });
  req.userId = userId;
  next();
});

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
