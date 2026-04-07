const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/productController');
const { validateCreateProduct } = require('../validators/productValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listProducts);
router.post('/', validateCreateProduct, controller.createProduct);

module.exports = router;
