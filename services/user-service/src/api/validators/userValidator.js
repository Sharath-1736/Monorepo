const Joi = require('joi');

exports.createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(50).required(),
  // ...other fields...
});

exports.validateCreateUser = (req, res, next) => {
  const { error } = exports.createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message, requestId: req.requestId } });
  }
  next();
};
