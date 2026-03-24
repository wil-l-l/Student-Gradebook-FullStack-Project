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
  const { type, name, userName, courseId, maxPoints } = req.body;

  const newAssignment = new Assignment({
    name,
    type: {
      name: type,
      weight: assignmentTypes[type],
    },
    isGraded: false, // Newly created assignments will always start as not graded, 'isGraded' will be true when the assignment is graded for every student
    maxPoints,
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
      maxPoints: newAssignment.maxPoints,
    },
  });
});

router.patch("/:id", async (req, res) => {
  const assignmentId = req.params.id;
  const { studentId, pointsEarned } = req.body;

  const studentToUpdate = await User.findOne({
    _id: studentId,
  }).select("courses");

  let assignmentToUpdate = null;

  studentToUpdate.courses.forEach(({ assignments }) => {
    assignments.forEach((assignmentObj) => {
      if (assignmentObj._id.toString() === assignmentId)
        assignmentToUpdate = assignmentObj;
    });
  });

  assignmentToUpdate.pointsEarned = pointsEarned;

  studentToUpdate.markModified("courses");
  const studentAfterUpdate = await studentToUpdate.save();

  res.status(200).send({
    success: true,
    data: {
      courses: studentAfterUpdate.courses,
    },
  });
});

module.exports = router;
