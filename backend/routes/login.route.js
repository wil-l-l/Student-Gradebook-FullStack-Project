const express = require("express");
const router = express.Router();
const { User, validateClientLoginInput } = require("../models/user.model");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;

  const { error } = validateClientLoginInput(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: "Invalid username or password" });

  const user = await User.findOne({
    userName,
    password,
  }).select("firstName lastName courses userName isStudent");

  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "Incorrect username or password" });

  res.send({ success: true, message: "Successfully logged in", data: user });
});

module.exports = router;
