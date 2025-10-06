const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts() { return await productRepository.getAll(); }
  async getProductById(id) { return await productRepository.getById(id); }
  async addProduct(data) { return await productRepository.create(data); }
  async updateProduct(id, data) { return await productRepository.update(id, data); }
  async deleteProduct(id) { return await productRepository.delete(id); }
}

module.exports = new ProductService();
