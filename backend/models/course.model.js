const mongoose = require("mongoose");
const { exhaustiveUniqueRandom } = require("unique-random");
const { User } = require("./user.model");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      immutable: true,
    },
    period: {
      type: Number,
      required: true,
      immutable: true,
    },
    students: {
      type: [Object],
      default: [],
    },
    assignments: {
      type: [Object],
      default: [],
    },
    teacherId: {
      type: String,
      required: true,
    },
    teacherName: {
      firstName: { type: String, required: true, minlength: 3, maxLength: 50 },
      lastName: { type: String, required: true, minlength: 3, maxLength: 50 },
    },
    schoolId: {
      type: String,
      required: true,
      immutable: true,
    },
  }),
);

function createStudentCourses(
  student,
  courses,
  saveUpdatesToTeacherAndCourse = null,
) {
  const numOfCourses = 3;
  const random = exhaustiveUniqueRandom(0, courses.length - 1);

  let count = 0;
  let filledPeriods = [];
  for (const number of random) {
    const course = courses[number];
    const coursePeriod = course.period;
    if (filledPeriods.includes(coursePeriod)) continue;

    count = count + 1;

    const studentCourseCopy = {
      teacherId: course.teacherId,
      teacherName: {
        firstName: course.teacherName.firstName,
        lastName: course.teacherName.lastName,
      },
      name: course.name,
      period: coursePeriod,
      assignments: saveUpdatesToTeacherAndCourse ? [] : course.assignments,
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

    saveUpdatesToTeacherAndCourse &&
      saveUpdatesToTeacherAndCourse(course, number);

    // The unique numbers will be iterated over infinitely
    if (count === numOfCourses) break;
  }
}

async function createStudentCoursesOnSignup(student, courses) {
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

  createStudentCourses(student, courses, async (generatedCourse, number) => {
    const teacher = await User.findById(generatedCourse.teacherId);

    const findUserCourseById = (userCourses) => {
      let foundCourse = null;
      userCourses.some((course) => {
        if (course.period === generatedCourse.period) {
          foundCourse = course;
          return true;
        }
      });
      return foundCourse;
    };

    const teacherCourse = findUserCourseById(teacher.courses);
    teacherCourse.students = courses[number].students;

    teacher.markModified("courses");
    try {
      await teacher.save();
      await courses[number].save();
    } catch (error) {
      console.log(
        "Could not save new student added to a teacher's courses or to a course document list of students",
      );
    }
  });
}

exports.Course = Course;
exports.createStudentCourses = createStudentCourses;
exports.createStudentCoursesOnSignup = createStudentCoursesOnSignup;
