const mongoose = require("mongoose");

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

module.exports = Assignment;
