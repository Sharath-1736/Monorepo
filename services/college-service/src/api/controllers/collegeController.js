const collegeRepository = require('../../domain/repositories/collegeRepository');

exports.listColleges = async (req, res, next) => {
  try {
    const items = await collegeRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createCollege = async (req, res, next) => {
  try {
    const item = await collegeRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
