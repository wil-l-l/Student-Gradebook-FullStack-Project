const express = require("express");
const router = express.Router();
const Course = require("../models/course.model");
const Assignment = require("../models/assignment.model");
const { User } = require("../models/user.model");
const { default: sharedConstants } = require("../../sharedConstants");
const { default: mongoose } = require("mongoose");

const { assignmentTypes } = sharedConstants;

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
  const { studentId, pointsEarned, teacherUserName } = req.body;

  const student = await User.findOne({
    _id: studentId,
  }).select("courses");
  const teacher = await User.findOne({ userName: teacherUserName });
  const course = await Course.findOne({
    assignments: {
      $elemMatch: {
        _id: new mongoose.Types.ObjectId(assignmentId),
      },
    },
  });

  const updateAssignmentFromAssignments = (assignments, isUser = true) => {
    assignments.some((assignmentObj, index) => {
      if (assignmentObj._id.toString() === assignmentId) {
        const generalUpdatedAssignment = { ...assignmentObj, isGraded: true };
        assignments[index] = isUser
          ? {
              ...generalUpdatedAssignment,
              pointsEarned: Number(pointsEarned),
            }
          : generalUpdatedAssignment;
        return true;
      }
    });
  };

  const findAssignmentFromCoursesAndUpdate = (courses, isUser = true) => {
    if (isUser)
      courses.forEach(({ assignments }) => {
        updateAssignmentFromAssignments(assignments);
      });
    else updateAssignmentFromAssignments(courses.assignments);
  };

  findAssignmentFromCoursesAndUpdate(student.courses);
  findAssignmentFromCoursesAndUpdate(teacher.courses);
  findAssignmentFromCoursesAndUpdate(course, false);

  const courseAssignments = course.assignments;
  courseAssignments.some((courseAssignmentObj, index) => {
    if (courseAssignmentObj._id.toString() === assignmentId) {
      courseAssignments[index] = {
        ...courseAssignmentObj,
        isGraded: true,
      };
      return true;
    }
  });

  student.markModified("courses");
  teacher.markModified("courses");
  course.markModified("assignments");
  const studentAfterUpdate = await student.save();
  await course.save();
  await teacher.save();

  res.status(200).send({
    success: true,
    data: {
      student: studentAfterUpdate,
    },
  });
});

module.exports = router;
