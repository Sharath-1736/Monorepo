const storeRepository = require('../../domain/repositories/storeRepository');

exports.listStores = async (req, res, next) => {
  try {
    const items = await storeRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const item = await storeRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

exports.getStorebyID = async (req, res, next) => {
  try {
    const item = await storeRepository.get(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Store not found from controller' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const item = await storeRepository.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const item = await storeRepository.update(req.params.id, { isDeleted: true});
    if (!item) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 

exports.restore= async (req, res, next) => {
  try {
    const item = await storeRepository.update(req.params.id, { isDeleted: false});
    if (!item) {
      return res.status(404).json({ message: 'Store restored successfully' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 