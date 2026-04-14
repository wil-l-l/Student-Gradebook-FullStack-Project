const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { User, validateClient } = require("../models/user.model");
const School = require("../models/school.model");
const { createStudentCoursesOnSignup } = require("../models/course.model");

router.post("/", async (req, res) => {
  const { error } = await validateClient(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

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

  newUser.schoolId = matchedSchool._id.toString();
  newUser.userName =
    (lastName + firstName[0]).toLowerCase() + matchedSchool.code;
  await createStudentCoursesOnSignup(newUser, matchedSchool.courses);

  newUser = await newUser.save();

  const newUserIdAsString = newUser._id.toString();
  if (isStudent === false)
    matchedSchool.teachers = [...matchedSchool.teachers, newUserIdAsString];
  else matchedSchool.students = [...matchedSchool.students, newUserIdAsString];

  await matchedSchool.save();

  res
    .status(201)
    .send({ success: true, message: "Created a new user", data: newUser });
});

module.exports = router;
