const orderService = require('../services/orderService');

exports.getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderService.getUserOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { totalAmount } = req.body;
    const order = await orderService.createOrder(userId, totalAmount);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updated = await orderService.updateOrderStatus(orderId, status);
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
