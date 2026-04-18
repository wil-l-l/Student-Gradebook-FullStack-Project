const express = require("express");
const router = express.Router();
const { Course } = require("../models/course.model");
const {
  Assignment,
  validateClientNewAssignment,
} = require("../models/assignment.model");
const { User } = require("../models/user.model");
const { default: sharedConstants } = require("../../sharedConstants");
const { default: mongoose } = require("mongoose");
const { assignmentTypes } = sharedConstants;

router.get("/:userName/:id", async (req, res) => {
  const { userName, id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(400)
      .send({ success: false, message: "Invalid id passed" });

  const teacher = await User.findOne({ userName }).select("courses -_id");
  if (!teacher)
    return res
      .status(404)
      .send({ success: false, message: "User could not be found" });

  const teacherCourses = teacher.courses;

  let assignment = null;
  teacherCourses.forEach((courseObj) => {
    courseObj.assignments.forEach((assignmentObj) => {
      if (assignmentObj._id.toString() === id) assignment = assignmentObj;
    });
  });

  if (assignment === null)
    return res
      .status(404)
      .send({ success: false, message: "Assignment could not be found" });

  res.status(200).send({
    success: true,
    data: assignment,
  });
});

router.post("/", async (req, res) => {
  const { type, name, userName, courseId, maxPoints } = req.body;
  const { error } = validateClientNewAssignment(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

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
  try {
    await course.save();
    await teacher.save();
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, message: "Could not create assignment" });
  }

  let countCompletedAsync = 0;
  const courseLoadingErrors = [];
  studentsWithCourse.forEach(async (student, index) => {
    student.markModified("courses");
    try {
      await student.save();
      countCompletedAsync += 1;

      if (!(countCompletedAsync === studentsWithCourse.length)) return;

      if (courseLoadingErrors.length > 0)
        res
          .status(500)
          .send({ success: false, message: "Could not create assignment" });
      else
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
    } catch (err) {
      courseLoadingErrors.push(err);
    }
  });
});

router.patch("/:id", async (req, res) => {
  const assignmentId = req.params.id;
  const { studentId, pointsEarned, teacherUserName } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(assignmentId) ||
    !mongoose.Types.ObjectId.isValid(studentId)
  )
    return res
      .status(400)
      .send({ success: false, message: "Invalid id passed" });

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

  if (!student || !teacher || !course)
    return res
      .status(404)
      .send({ success: false, message: "Could not find a resource" });

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
  try {
    const studentAfterUpdate = await student.save();
    await course.save();
    await teacher.save();

    res.status(200).send({
      success: true,
      data: {
        student: studentAfterUpdate,
      },
    });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Could not update assignment" });
  }
});

module.exports = router;
