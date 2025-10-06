const reviewRepository = require('../repositories/reviewRepository');

class ReviewService {
  getReviewsForProduct(productId) {
    return reviewRepository.getReviewsByProductId(productId);
  }

  getUserReview(userId, productId) {
    return reviewRepository.getUserReview(userId, productId);
  }

  addReview(userId, productId, rating, comment) {
    return reviewRepository.addReview(userId, productId, rating, comment);
  }

  updateReview(userId, productId, rating, comment) {
    return reviewRepository.updateReview(userId, productId, rating, comment);
  }

  deleteReview(userId, productId) {
    return reviewRepository.deleteReview(userId, productId);
  }
}

module.exports = new ReviewService();
