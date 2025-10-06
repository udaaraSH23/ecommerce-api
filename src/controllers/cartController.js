const cartService = require('../services/cartService');

exports.getCart = async (req, res) => {
  try {
    const userId = req.userId; // provided by WSO2 via header
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const item = await cartService.addToCart(userId, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const updated = await cartService.updateCartItem(userId, productId, quantity);
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const removed = await cartService.removeFromCart(userId, productId);
    if (!removed) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
