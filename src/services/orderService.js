const orderRepository = require('../repositories/orderRepository');

class OrderService {
  createOrder(userId, totalAmount) {
    return orderRepository.createOrder(userId, totalAmount);
  }

  getUserOrders(userId) {
    return orderRepository.getOrdersByUserId(userId);
  }

  updateOrderStatus(orderId, status) {
    return orderRepository.updateOrderStatus(orderId, status);
  }
}

module.exports = new OrderService();
