const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const user = await User.findOne({ username: res.username }).select(
    "firstName lastName userName -_id",
  );

  if (!user) {
    return res
      .status(404)
      .send({ success: false, message: "Could not login" });
  }

  res
    .status(200)
    .send({ sucess: true, message: "Successfully logged in", data: user });
});

module.exports = router;
