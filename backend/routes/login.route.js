const express = require("express");
const router = express.Router();
const { User, validateClientLoginInput } = require("../models/user.model");

router.post("/", async (req, res) => {
  const { userName } = req.body;

  const { error } = validateClientLoginInput(userName);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  const user = await User.findOne({ userName: userName }).select(
    "firstName lastName courses userName isStudent",
  );

  if (!user)
    return res.status(404).send({ success: false, message: "Could not login" });

  res
    .status(200)
    .send({ success: true, message: "Successfully logged in", data: user });
});

module.exports = router;
