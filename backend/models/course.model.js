const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    students: {
      type: [],
    },
    assignments: {
      type: [],
    },
    teacherId: {
      type: String,
      required: true,
    },
    schoolId:{
      type: String,
      required: true
    }
  }),
);

module.exports = Course;
