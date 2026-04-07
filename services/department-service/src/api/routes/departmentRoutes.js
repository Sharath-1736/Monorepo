const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const departmentController = require('../controllers/departmentController');
const { validateCreateDepartment } = require('../validators/departmentValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', departmentController.listDepartments);
router.post('/', validateCreateDepartment, departmentController.createDepartment);

module.exports = router;
