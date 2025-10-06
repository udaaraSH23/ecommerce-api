const wishlistService = require('../services/wishlistService');

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const wishlist = await wishlistService.getWishlist(userId);
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    const item = await wishlistService.addToWishlist(userId, productId);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const removed = await wishlistService.removeFromWishlist(userId, productId);
    if (!removed) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
