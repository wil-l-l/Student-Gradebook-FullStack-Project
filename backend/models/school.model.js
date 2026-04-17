const mongoose = require("mongoose");

const School = mongoose.model(
  "School",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 75,
    },
    code: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
      immutable: true,
    },
    teachers: {
      type: [String], // an array of teacher document ids
      default: [],
    },
    students: {
      type: [String], // an array of student document ids
      default: [],
    },
    courses: {
      type: [String],
      required: true,
    },
  }),
);

module.exports = School;
