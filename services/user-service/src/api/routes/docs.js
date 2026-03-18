// Swagger UI route for OpenAPI docs
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../openapi.json');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
