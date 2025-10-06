const Wishlist = require('../model/wishlistModel');

class WishlistRepository {
  getWishlistByUserId(userId) {
    return Wishlist.findAll({ where: { userId } });
  }

  addItem(userId, productId) {
    return Wishlist.create({ userId, productId });
  }

  removeItem(userId, productId) {
    return Wishlist.destroy({ where: { userId, productId } })
      .then(rowsDeleted => rowsDeleted > 0);
  }
}

module.exports = new WishlistRepository();
