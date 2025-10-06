const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);    // admin use
router.put('/:id', productController.update);  // admin use
router.delete('/:id', productController.remove); // admin use

module.exports = router;
