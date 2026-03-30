const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();

router.use("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).send({ success: true, data: user });
});

module.exports = router;
