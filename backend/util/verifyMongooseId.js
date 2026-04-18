const mongoose = require("mongoose");

const verifyMongooseId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return { success: false, status: 404, message: "Invalid id passed" };

  return true;
};

module.exports = verifyMongooseId;
