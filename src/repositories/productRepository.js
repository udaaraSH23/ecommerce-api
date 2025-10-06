const Product = require('../model/productModel');

class ProductRepository {
  async getAll() { return await Product.findAll(); }
  async getById(id) { return await Product.findByPk(id); }
  async create(data) { return await Product.create(data); }
  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  }
  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
}

module.exports = new ProductRepository();
