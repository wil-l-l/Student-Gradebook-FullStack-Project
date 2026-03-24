const mongoose = require("mongoose");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Object, // { <assignment_type> : <assignment_type_weight> }
      required: true,
    },
  }),
);

module.exports = Assignment;
