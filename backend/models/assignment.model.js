const mongoose = require("mongoose");
const Joi = require("joi");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80,
      immutable: true,
    },
    type: {
      name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        immutable: true,
      },
      weight: {
        type: Number,
        min: 5,
        max: 70,
        required: true,
        immutable: true,
      },
    },
    isGraded: {
      type: Boolean,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
      min: 5,
      max: 100,
      immutable: true,
    },
    pointsEarned: {
      type: Number,
      min: 0,
      max: 100,
    },
  }),
);

function validateClientNewAssignment(reqBody) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    type: Joi.string().min(3).max(30).required(), // The client is only passing the name of the assignment type
    userName: Joi.string().min(6).max(52).required(),
    courseId: Joi.string().min(24).max(24).required(),
    maxPoints: Joi.number().min(5).max(100).required(),
  });

  return schema.validate(reqBody);
}

exports.Assignment = Assignment;
exports.validateClientNewAssignment = validateClientNewAssignment;
