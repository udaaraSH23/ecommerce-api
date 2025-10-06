const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 }
});

module.exports = Product;
