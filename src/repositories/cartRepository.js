const Cart = require('../model/cartModel');

class CartRepository {
  getCartByUserId(userId) {
    return Cart.findAll({ where: { userId } });
  }

  addItem(userId, productId, quantity) {
    return Cart.create({ userId, productId, quantity });
  }

  updateItem(userId, productId, quantity) {
    return Cart.update(
      { quantity },
      { where: { userId, productId } }
    ).then(([rowsUpdated]) => rowsUpdated > 0);
  }

  removeItem(userId, productId) {
    return Cart.destroy({ where: { userId, productId } }).then(rowsDeleted => rowsDeleted > 0);
  }
}

module.exports = new CartRepository();
