const dotenv = require('dotenv');
const Joi = require('joi');

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${env}` });
dotenv.config(); // fallback to .env

const schema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  SERVICE_NAME: Joi.string().required(),
  PORT: Joi.number().default(3000),
  LOG_LEVEL: Joi.string().default('info'),
}).unknown();

const { error, value: envVars } = schema.validate(process.env, { abortEarly: false });
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = envVars;
