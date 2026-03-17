const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const School = require("../models/school.model");

router.post("/", async (req, res) => {
  const { firstName, lastName, middleName, school } = req.body;
  let newStudent = new User({
    firstName,
    lastName,
  });
  if (middleName) newStudent.middleName = middleName;

  const schoolFound = await School.find().or([
    { name: school },
    { code: school },
  ]); // the value of 'school' passed by the client could be the school name or school code

  newStudent.userName =
    (lastName + firstName[0]).toLowerCase() + schoolFound[0].code;

  newStudent = await newStudent.save();

  res
    .status(201)
    .send({ success: true, message: "Created a new user", data: newStudent });
});

module.exports = router;
