const logger = require('@monorepo/logger');
const userRepository = require('../../domain/repositories/userRepository');
const ApiError = require('@monorepo/errors/ApiError');


exports.getUser = async (req, res, next) => {
  const { email } = req.params;
  const requestId = req.headers['x-request-id'] || req.requestId;
  try {
    logger.info('Fetching user', { requestId, email });
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError(404, 'User not found');
    res.json(user);
  } catch (err) {
    logger.error('Error fetching user', { requestId, error: err });
    next(err);
  }
};


const eventPublisher = require('../../infrastructure/external/eventPublisher');

exports.createUser = async (req, res, next) => {
  const requestId = req.headers['x-request-id'] || req.requestId;
  try {
    logger.info('Creating user', { requestId, body: req.body });
    const user = await userRepository.create(req.body);
    // Publish async event (future: Kafka/RabbitMQ)
    await eventPublisher.publish('UserCreated', { userId: user._id, email: user.email }, { requestId });
    res.status(201).json(user);
  } catch (err) {
    logger.error('Error creating user', { requestId, error: err });
    next(err);
  }
};
