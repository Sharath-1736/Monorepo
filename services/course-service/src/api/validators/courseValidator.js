const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  code: Joi.string().required(),
  credits: Joi.number().required(),
  department: Joi.string().required()
});

exports.validateCreateCourse = (req, res, next) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: {
        message: error.details[0].message,
        requestId: req.requestId,
      },
    });
    return;
  }

  next();
};
