const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/collegeController');
const { validateCreateCollege } = require('../validators/collegeValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listColleges);
router.post('/', validateCreateCollege, controller.createCollege);

module.exports = router;
