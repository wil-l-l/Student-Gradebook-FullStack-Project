const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const { firstName, lastName, middleName } = req.body;
  let newStudent = new User({
    firstName,
    lastName,
    userName: (lastName + firstName[0]).toLowerCase(),
  });
  if (middleName) newStudent.middleName = middleName;

  console.log(newStudent.userName);
  newStudent = await newStudent.save();

  console.log(newStudent);
  res.status(201).send({ success: true, message: "Created a new user" });
});

module.exports = router;
