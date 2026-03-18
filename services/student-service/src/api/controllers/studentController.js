const studentRepository = require('../../domain/repositories/studentRepository');

exports.listStudents = async (req, res, next) => {
  try {
    const items = await studentRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const item = await studentRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
