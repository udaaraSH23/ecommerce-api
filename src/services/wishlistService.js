const wishlistRepository = require('../repositories/wishlistRepository');

class WishlistService {
  getWishlist(userId) {
    return wishlistRepository.getWishlistByUserId(userId);
  }

  addToWishlist(userId, productId) {
    return wishlistRepository.addItem(userId, productId);
  }

  removeFromWishlist(userId, productId) {
    return wishlistRepository.removeItem(userId, productId);
  }
}

module.exports = new WishlistService();
