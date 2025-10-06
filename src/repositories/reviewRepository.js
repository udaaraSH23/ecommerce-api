const Review = require('../model/reviewModel');

class ReviewRepository {
  getReviewsByProductId(productId) {
    return Review.findAll({ where: { productId }, order: [['createdAt', 'DESC']] });
  }

  getUserReview(userId, productId) {
    return Review.findOne({ where: { userId, productId } });
  }

  addReview(userId, productId, rating, comment) {
    return Review.create({ userId, productId, rating, comment });
  }

  updateReview(userId, productId, rating, comment) {
    return Review.update(
      { rating, comment },
      { where: { userId, productId } }
    ).then(([rowsUpdated]) => rowsUpdated > 0);
  }

  deleteReview(userId, productId) {
    return Review.destroy({ where: { userId, productId } })
      .then(rowsDeleted => rowsDeleted > 0);
  }
}

module.exports = new ReviewRepository();
