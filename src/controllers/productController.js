const productService = require('../services/productService');

exports.getAll = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

exports.create = async (req, res) => {
  const newProduct = await productService.addProduct(req.body);
  res.status(201).json(newProduct);
};

exports.update = async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Product not found' });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const success = await productService.deleteProduct(req.params.id);
  if (!success) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
};
