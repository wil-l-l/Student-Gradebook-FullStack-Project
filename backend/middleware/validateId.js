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

  const ids = [req.params.id];
  if (req.body) ids.push(req.body.studentId, req.body.courseId);

  if (ids.some((id) => verifyId(id) === false)) return getErrorResponse();

  next();
};
