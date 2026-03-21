const express = require("express");
const router = express.Router();
const School = require("../models/school.model");
const { User } = require("../models/user.model");
const Course = require("../models/course.model");
const constants = require("../constants");
const uuid = require("uuid");
const { exhaustiveUniqueRandom } = require("unique-random");

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
  let coursesArr = [];
  if (teachers && teachers.length > 0) {
    teachersArr = teachers.map(({ firstName, lastName }) => {
      const newTeacher = new User({
        firstName,
        lastName,
        isStudent: false,
        userName: (lastName + firstName[0]).toLowerCase() + newSchool.code,
        schoolId: newSchool._id.toString(),
      });

      createTeacherCourses(newTeacher);
      coursesArr.push(...newTeacher.courses);
      newTeacher.courses.forEach(({ _id }) => newSchool.courses.push(_id));

      return newTeacher;
    });
  }
  let studentsArr = [];
  if (students && students.length > 0) {
    studentsArr = students.map(({ firstName, lastName, middleName }) => {
      const newStudent = new User({
        firstName,
        lastName,
        userName: (lastName + firstName[0]).toLowerCase() + newSchool.code,
        schoolId: newSchool._id.toString(),
      });
      if (middleName) newStudent.middleName = middleName;

      createStudentCourses(newStudent, coursesArr);

      return newStudent;
    });
  }
  newSchool.teachers = teachersArr.map(({ _id }) => _id.toString());
  newSchool.students = studentsArr.map(({ _id }) => _id.toString());

  await Course.bulkSave(coursesArr);
  await User.bulkSave(teachersArr);
  await User.bulkSave(studentsArr);
  newSchool = await newSchool.save();

  res.status(200).send({
    success: true,
    message: "Successfully registered school",
    data: newSchool,
  });
});

function createTeacherCourses(teacher) {
  const numOfCourses = 3;
  const random = exhaustiveUniqueRandom(0, constants.classes.length - 1);

  let count = 0;
  for (const number of random) {
    count = count + 1;

    teacher.courses.push(
      new Course({
        name: constants.classes[number],
        period: count,
        students: [],
        assignments: [],
        teacherId: teacher._id.toString(),
      }),
    );

    // The unique numbers will be iterated over infinitely
    if (count === numOfCourses) break;
  }
}

function createStudentCourses(student, courses) {
  const numOfCourses = 2;
  const random = exhaustiveUniqueRandom(0, courses.length - 1);

  let count = 0;
  for (const number of random) {
    count = count + 1;
    const course = courses[number];

    const studentCourseCopy = {
      teacherId: course.teacherId,
      name: course.name,
      period: course.period,
      assignments: course.assignments,
      grade: null,
      id: course._id.toString(),
    };

    const studentDocumentCopy = { ...student._doc };
    const courseStudentCopy = {
      firstName: studentDocumentCopy.firstName,
      lastName: studentDocumentCopy.lastName,
      isStudent: studentDocumentCopy.isStudent,
      schoolId: studentDocumentCopy.schoolId,
      grade: null,
    };

    courses[number].students.push(courseStudentCopy);
    student.courses.push(studentCourseCopy);

    // The unique numbers will be iterated over infinitely
    if (count === numOfCourses) break;
  }
}

module.exports = router;
