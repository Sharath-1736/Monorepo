const cartRepository = require('../../domain/repositories/cartRepository');

exports.listCarts = async (req, res, next) => {
  try {
    const items = await cartRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const item = await cartRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const item = await cartRepository.get(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const item = await cartRepository.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const success = await cartRepository.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};