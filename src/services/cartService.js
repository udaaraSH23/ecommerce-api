const cartRepository = require('../repositories/cartRepository');

class CartService {
  getCart(userId) {
    return cartRepository.getCartByUserId(userId);
  }

  addToCart(userId, productId, quantity) {
    return cartRepository.addItem(userId, productId, quantity);
  }

  updateCartItem(userId, productId, quantity) {
    return cartRepository.updateItem(userId, productId, quantity);
  }

  removeFromCart(userId, productId) {
    return cartRepository.removeItem(userId, productId);
  }
}

module.exports = new CartService();
