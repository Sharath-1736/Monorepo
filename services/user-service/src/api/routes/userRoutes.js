const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const { validateCreateUser } = require('../validators/userValidator');

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/:email', userController.getUser);
router.post('/', validateCreateUser, userController.createUser);
// ...other routes...

module.exports = router;
