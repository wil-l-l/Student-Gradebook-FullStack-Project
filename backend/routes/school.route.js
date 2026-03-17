const express = require("express");
const router = express.Router();
const School = require("../models/school.model");
const uuid = require("uuid");

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

  newSchool = await newSchool.save();

  res.status(200).send({
    success: true,
    message: "Successfully registered school",
    data: newSchool,
  });
});

module.exports = router;
