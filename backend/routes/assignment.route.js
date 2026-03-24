const express = require("express");
const router = express.Router();
const Course = require("../models/course.model");
const Assignment = require("../models/assignment.model");
const { User } = require("../models/user.model");

const assignmentTypes = {
  homework: 30,
  classwork: 20,
  assessment: 50,
};

router.post("/", async (req, res) => {
  const { teacherId, courseId, type, name } = req.body;

  const newAssignment = new Assignment({
    name,
    type: {
      [type]: assignmentTypes[type],
    },
  });

  const course = await Course.findById(courseId);
  const teacher = await User.findById(teacherId);
  const teacherCourse = teacher.courses.find(
    ({ _id }) => _id.toString() === course._id.toString(),
  );

  const studentsWithCourse = await User.find({
    courses: {
      $elemMatch: {
        name: course.name,
      },
    },
    isStudent: true,
  });

  course.assignments.push(newAssignment);
  teacherCourse.assignments.push(newAssignment);
  studentsWithCourse.forEach(({ courses }) => {
    courses.forEach(({ name, assignments }) => {
      if (name === course.name) assignments.push(newAssignment);
    });
  });

  teacher.markModified("courses");
  await course.save();
  await teacher.save();
  studentsWithCourse.forEach(async (student) => {
    student.markModified("courses");
    await student.save();
  });

  res.status(200).send({
    success: true,
    data: {
      name: newAssignment.name,
      type: newAssignment.type,
      grade: newAssignment.grade,
    },
  });
});

module.exports = router;
