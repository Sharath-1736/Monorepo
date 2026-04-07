const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/storeController');
const { validateCreateStore } = require('../validators/storeValidator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.listStores);
router.post('/', validateCreateStore, controller.createStore);
router.get('/:id', controller.getStorebyID);
router.put('/:id', controller.updateStore);
router.delete('/:id', controller.deleteStore);
router.post('/:id/restore', controller.restore);

module.exports = router;
