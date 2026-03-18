const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  usn: Joi.string().required(), 
  course: Joi.string().required(),  
  college: Joi.string().required() 
});

exports.validateCreateStudent = (req, res, next) => {
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
