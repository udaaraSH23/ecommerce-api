const Order = require('../model/orderModel');

class OrderRepository {
  createOrder(userId, totalAmount) {
    return Order.create({ userId, totalAmount });
  }

  getOrdersByUserId(userId) {
    return Order.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  updateOrderStatus(orderId, status) {
    return Order.update({ status }, { where: { id: orderId } })
      .then(([rowsUpdated]) => rowsUpdated > 0);
  }
}

module.exports = new OrderRepository();
