const courseRepository = require('../../domain/repositories/courseRepository');

exports.listCourses = async (req, res, next) => {
  try {
    const items = await courseRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const item = await courseRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
