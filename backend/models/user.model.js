const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    middleName: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    // 'userName' Not passed by client, created in server
    userName: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 52,
    },
    isStudent: {
      type: Boolean,
      default: true,
    },
    schoolId: {
      type: String,
      required: true,
    },
  }),
);

function validateClient(req) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    middleName: Joi.string().min(3).max(50),
    school: Joi.string().min(4).max(75).required(), // could be school name or school code, which is why minimum is 4
    isStudent: Joi.bool(),
  });

  return schema.validate(req);
}

exports.User = User;
exports.validateClient = validateClient;
