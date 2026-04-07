const departmentRepository = require('../../domain/repositories/departmentRepository');

exports.listDepartments = async (req, res, next) => {
  try {
    const items = await departmentRepository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const item = await departmentRepository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

