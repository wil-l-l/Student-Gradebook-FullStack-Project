import "./ViewCoursePage.css";
import AssignmentsTable from "../../components/AssignmentsTable/AssignmentsTable";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import GradesBar from "../../components/GradesBar/GradesBar";
import StudentDropdown from "../../components/StudentDropdown/StudentDropdown";
import CourseDropdown from "../../components/CourseDropdown/CourseDropdown";

const ViewCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period, id } = useParams();
  const [loadedStudentData, setLoadedStudentData] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState(id);
  const [updatedAssignments, setUpdatedAssignments] = useState([]);

  const [currentCourse, setCurrentCourse] = useState(
    getCourseFromPeriod(user.courses, period),
  );

  const courseAssignments = currentCourse.assignments;
  const isStudent = user.isStudent;

  useEffect(() => {
    const getStudent = async () => {
      let response = await fetch(`/api/users/${currentStudentId}`);
      response = await response.json();
      const studentData = response.data;
      setLoadedStudentData(studentData);
      setUpdatedAssignments([]);
    };
    if (isStudent === false) getStudent();
  }, [
    isStudent,
    setLoadedStudentData,
    id,
    courseAssignments,
    period,
    currentStudentId,
  ]);

  const getAssignments = () =>
    isStudent
      ? courseAssignments
      : getCourseFromPeriod(loadedStudentData.courses, period).assignments;

  return (
    <section className="view-course-page">
      <div className="view_course_page__course-info-bar">
        <h2>Course: {currentCourse.name}</h2>
        <p>Period: {currentCourse.period}</p>
      </div>
      {isStudent ? (
        <>
          <p>
            Teacher:{" "}
            {currentCourse.teacherName.firstName +
              " " +
              currentCourse.teacherName.lastName}
          </p>
          <CourseDropdown
            user={user}
            currentCourse={currentCourse}
            setCurrentCourse={setCurrentCourse}
          />
          <GradesBar assignments={getAssignments()} />
          <AssignmentsTable
            isStudent={user.isStudent}
            assignments={getAssignments()}
          />
        </>
      ) : loadedStudentData === null && isStudent === false ? (
        <p>Loading course assignments for student...</p>
      ) : (
        <>
          <p className="view-course-page__teacher-view-text">
            Teacher View of Student:{" "}
            <span className="magenta-text bold-text">
              {" "}
              {loadedStudentData.firstName + " " + loadedStudentData.lastName}
            </span>
          </p>
          {isStudent === false && loadedStudentData && (
            <StudentDropdown
              students={currentCourse.students}
              currentStudent={loadedStudentData}
              setCurrentStudentId={setCurrentStudentId}
            />
          )}
          <GradesBar
            assignments={getAssignments()}
            updatedAssignments={updatedAssignments}
          />
          <AssignmentsTable
            isStudent={user.isStudent}
            assignments={getAssignments()}
            teacherUserName={user.userName}
            updatedAssignments={updatedAssignments}
            setUpdatedAssignments={setUpdatedAssignments}
          />
        </>
      )}
    </section>
  );
};

export default ViewCoursePage;
