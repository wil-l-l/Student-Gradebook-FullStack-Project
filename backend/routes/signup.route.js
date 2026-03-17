const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const School = require("../models/school.model");

router.post("/", async (req, res) => {
  const { firstName, lastName, middleName, school, isStudent } = req.body;
  let newUser = new User({
    firstName,
    lastName,
  });
  if (middleName) newUser.middleName = middleName;
  if (isStudent === false) newUser.isStudent = false;

  const schoolFound = await School.find().or([
    { name: school },
    { code: school },
  ]); // the value of 'school' passed by the client could be the school name or school code

  const matchedSchool = schoolFound[0];
  newUser.userName =
    (lastName + firstName[0]).toLowerCase() + matchedSchool.code;

  newUser = await newUser.save();

  if (isStudent === false)
    matchedSchool.teachers = [...matchedSchool.teachers, newUser];
  else matchedSchool.students = [...matchedSchool.students, newUser];

  await matchedSchool.save();

  res
    .status(201)
    .send({ success: true, message: "Created a new user", data: newUser });
});

module.exports = router;
