const mongoose = require("mongoose");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80,
    },
    type: {
      type: Object, // { name: <assignment_type_name>, weight: <assignment_type_weight> }
      required: true,
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
    },
    pointsEarned: {
      type: Number,
      min: 0,
      max: 100,
    },
  }),
);

module.exports = Assignment;
