const express = require("express");
const router = express.Router();
const School = require("../models/school.model");
const uuid = require("uuid");
const { User } = require("../models/user.model");

router.get("/", async (req, res) => {
  const schools = await School.find().select("name code -_id");
  res.status(200).send({
    success: true,
    message: "Got all schools",
    data: schools,
  });
});

router.post("/", async (req, res) => {
  let newSchool = new School({
    name: req.body.name,
  });

  const getCode = () => uuid.v4().slice(0, 4);

  let uniqueCodeGenerated = false;
  do {
    const codeGenerated = getCode();
    const matchingCodeSchools = await School.find({ code: codeGenerated });
    if (matchingCodeSchools.length === 0) {
      uniqueCodeGenerated = true;
      newSchool.code = codeGenerated;
    }
  } while (uniqueCodeGenerated === false);

  const { teachers, students } = req.body;
  let teachersArr = [];
  if (teachers && teachers.length > 0) {
    teachersArr = teachers.map(
      ({ firstName, lastName, isStudent }) =>
        new User({
          firstName,
          lastName,
          isStudent: false,
          userName: (lastName + firstName[0]).toLowerCase() + newSchool.code,
          schoolId: newSchool._id.toString(),
        }),
    );
  }
  newSchool.teachers = teachersArr.map(({ _id }) => _id.toString());

  await User.bulkSave(teachersArr);
  newSchool = await newSchool.save();

  res.status(200).send({
    success: true,
    message: "Successfully registered school",
    data: newSchool,
  });
});

module.exports = router;
