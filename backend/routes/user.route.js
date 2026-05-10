const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const mongoose = require("mongoose");
const validateId = require("../middleware/validateId");

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "Could not get user" });

  res.send({ success: true, data: user });
});

module.exports = router;
