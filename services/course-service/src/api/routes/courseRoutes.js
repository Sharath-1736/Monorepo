const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/courseController');
const { validateCreateCourse } = require('../validators/courseValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listCourses);
router.post('/', validateCreateCourse, controller.createCourse);

module.exports = router;
