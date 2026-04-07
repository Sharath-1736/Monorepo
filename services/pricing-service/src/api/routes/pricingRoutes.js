const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/pricingController');
const { validateCreatePricing } = require('../validators/pricingValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listPricings);
router.post('/', validateCreatePricing, controller.createPricing);

module.exports = router;
