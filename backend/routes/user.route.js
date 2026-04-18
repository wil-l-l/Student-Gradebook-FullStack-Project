const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const mongoose = require("mongoose");
const verifyMongooseId = require("../util/verifyMongooseId");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const isValidMongooseId = verifyMongooseId(id);
  if (isValidMongooseId !== true)
    return res
      .status(isValidMongooseId.status)
      .send({ ...isValidMongooseId, status: undefined });

  const user = await User.findById(id);
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "Could not get user" });

  res.status(200).send({ success: true, data: user });
});

module.exports = router;
