const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  const getErrorResponse = () => {
    return res
      .status(400)
      .send({ success: false, message: "Invalid id passed" });
  };

  const verifyId = (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) return false;
    return true;
  };

  const { id } = req.params;
  if (verifyId(id) === false) return getErrorResponse();

  const { studentId } = req.body;
  if (verifyId(id) === false) return getErrorResponse();

  next();
};
