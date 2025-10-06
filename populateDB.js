// populateDb.js
const { faker } = require('@faker-js/faker');
const sequelize = require('./src/config/db');
const Product = require('./src/model/productModel');
const Cart = require('./src/model/cartModel');
const Wishlist = require('./src/model/wishlistModel');
const Order = require('./src/model/orderModel');
const Review = require('./src/model/reviewModel');

async function populateData() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    // 1️⃣ Products (10)
    const productsData = [];
    for (let i = 1; i <= 10; i++) {
      productsData.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 50, max: 2000, dec: 2 })),
        stock: faker.number.int({ min: 1, max: 50 }),
      });
    }
    const products = await Product.bulkCreate(productsData);

    // 2️⃣ Carts (10)
    const cartData = [];
    for (let i = 1; i <= 10; i++) {
      const productId = faker.number.int({ min: 1, max: 10 });
      cartData.push({
        userId: i,
        productId,
        quantity: faker.number.int({ min: 1, max: 5 }),
      });
    }
    await Cart.bulkCreate(cartData);

    // 3️⃣ Wishlists (10)
    const wishlistData = [];
    for (let i = 1; i <= 10; i++) {
      const productId = faker.number.int({ min: 1, max: 10 });
      wishlistData.push({
        userId: i,
        productId,
      });
    }
    await Wishlist.bulkCreate(wishlistData);

    // 4️⃣ Orders (10)
    const orderData = [];
    const statuses = ['pending', 'completed', 'cancelled'];
    for (let i = 1; i <= 10; i++) {
      orderData.push({
        userId: i,
        totalAmount: parseFloat(faker.number.float({ min: 100, max: 5000, precision: 0.01 }).toFixed(2)),
        status: statuses[faker.number.int({ min: 0, max: statuses.length - 1 })],
        createdAt: faker.date.past({ years: 1 }),
      });
    }
    await Order.bulkCreate(orderData);

    // 5️⃣ Reviews (10)
    const reviewData = [];
    for (let i = 1; i <= 10; i++) {
      const productId = faker.number.int({ min: 1, max: 10 });
      reviewData.push({
        userId: i,
        productId,
        rating: parseFloat(faker.number.float({ min: 1, max: 5, precision: 0.1 }).toFixed(1)),
        comment: faker.lorem.sentence(),
        createdAt: faker.date.recent({ days: 30 }),
      });
    }
    await Review.bulkCreate(reviewData);

    console.log('Randomized 10 entries populated for each table successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error populating DB:', err);
    process.exit(1);
  }
}

populateData();