const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/cartController');
const { validateCreateCart } = require('../validators/cartValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listCarts);
//router.post('/', validateCreateCart, controller.createCart);
router.post('/', controller.createCart);
router.get('/:id', controller.getCart);
router.put('/:id', controller.updateCart);
router.delete('/:id', controller.deleteCart);

module.exports = router;
