const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const { userName } = req.body;
  if (!userName)
    return res.status(404).send({ success: false, message: "Could not login" });

  const user = await User.findOne({ userName: userName }).select(
    "firstName lastName userName -_id",
  );

  if (!user) {
    return res.status(404).send({ success: false, message: "Could not login" });
  }

  res
    .status(200)
    .send({ success: true, message: "Successfully logged in", data: user });
});

module.exports = router;
