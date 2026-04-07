const productRepository = require('../../domain/repositories/productRepository');

exports.listProducts = async (req, res, next) => {
  try {
    const items = await productRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const item = await productRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
