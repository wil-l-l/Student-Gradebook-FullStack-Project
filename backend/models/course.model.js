const mongoose = require("mongoose");
const { exhaustiveUniqueRandom } = require("unique-random");
const { User } = require("./user.model");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    students: {
      type: [],
    },
    assignments: {
      type: [],
    },
    teacherId: {
      type: String,
      required: true,
    },
    schoolId: {
      type: String,
      required: true,
    },
  }),
);

async function createStudentCourses(student, courses) {
  const numOfCourses = 3;
  const random = exhaustiveUniqueRandom(0, courses.length - 1);

  const getCourseDocuments = async () => {
    const courseDocs = [];

    const promisedCourses = new Promise((resolve, reject) => {
      courses.forEach(async (id) => {
        const foundCourse = await Course.findById(id);
        courseDocs.push(foundCourse);
        if (courseDocs.length === courses.length) resolve(courseDocs);
      });
    });

    return promisedCourses;
  };
  courses = await getCourseDocuments();

  let count = 0;
  let filledPeriods = [];
  for (const number of random) {
    const course = courses[number];
    const coursePeriod = course.period;
    if (filledPeriods.includes(coursePeriod)) continue;

    count = count + 1;

    const studentCourseCopy = {
      teacherId: course.teacherId,
      name: course.name,
      period: coursePeriod,
      assignments: [],
      id: course._id.toString(),
    };

    const studentDocumentCopy = { ...student._doc };
    const courseStudentCopy = {
      firstName: studentDocumentCopy.firstName,
      lastName: studentDocumentCopy.lastName,
      isStudent: studentDocumentCopy.isStudent,
      schoolId: studentDocumentCopy.schoolId,
      _id: studentDocumentCopy._id.toString(),
    };

    courses[number].students.push(courseStudentCopy);
    student.courses.push(studentCourseCopy);
    filledPeriods.push(coursePeriod);

    const teacher = await User.findById(course.teacherId);

    const findUserCourseById = (userCourses) => {
      let foundCourse = null;
      userCourses.some((course) => {
        if (course.period === coursePeriod) {
          foundCourse = course;
          return true;
        }
      });
      return foundCourse;
    };

    const teacherCourse = findUserCourseById(teacher.courses);
    teacherCourse.students = courses[number].students;

    teacher.markModified("courses");
    await teacher.save();
    await courses[number].save();

    // The unique numbers will be iterated over infinitely
    if (count === numOfCourses) break;
  }
}

exports.Course = Course;
exports.createStudentCourses = createStudentCourses;
