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
  const { type, name, userName, courseId, points } = req.body;

  const newAssignment = new Assignment({
    name,
    type: {
      name: type,
      weight: assignmentTypes[type],
    },
    isGraded: false, // Newly created assignments will always start as not graded, 'isGraded' will be true when the assignment is graded for every student
    points,
  });

  const course = await Course.findById(courseId);
  const teacher = await User.findOne({ userName });
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

  res.status(201).send({
    success: true,
    data: {
      name: newAssignment.name,
      type: newAssignment.type,
      grade: newAssignment.grade,
      isGraded: newAssignment.isGraded,
      points: newAssignment.points,
    },
  });
});

module.exports = router;
