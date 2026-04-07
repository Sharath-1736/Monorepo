const pricingRepository = require('../../domain/repositories/pricingRepository');

exports.listPricings = async (req, res, next) => {
  try {
    const items = await pricingRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createPricing = async (req, res, next) => {
  try {
    const item = await pricingRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
