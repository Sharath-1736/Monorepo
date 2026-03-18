const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/studentController');
const { validateCreateStudent } = require('../validators/studentValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listStudents);
router.post('/', validateCreateStudent, controller.createStudent);

module.exports = router;
