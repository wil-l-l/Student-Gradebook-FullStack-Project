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
  const { user, setUser } = useContext(UserContext);
  const { period, id } = useParams();
  const [loadedStudentData, setLoadedStudentData] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState(
    user.isStudent ? user._id : id,
  );
  const [updatedAssignments, setUpdatedAssignments] = useState([]);

  const currentCourse = getCourseFromPeriod(user.courses, period);
  const isStudent = user.isStudent;

  useEffect(() => {
    const getStudent = async () => {
      let response = await fetch(`/api/users/${currentStudentId}`);
      response = await response.json();
      const studentData = response.data;
      if (isStudent) setUser(studentData);
      setLoadedStudentData(studentData);
      setUpdatedAssignments([]);
    };
    getStudent();
  }, [setLoadedStudentData, period, currentStudentId, isStudent, setUser]);

  const getAssignments = () =>
    loadedStudentData
      ? getCourseFromPeriod(loadedStudentData.courses, period).assignments
      : currentCourse.assignments;

  return (
    <section className="view-course-page">
      <div className="view_course_page__course-info-bar page-padding">
        <h2 className="view-course-page__course-title">
          Course: {currentCourse.name}
        </h2>
        <p>Period: {currentCourse.period}</p>
      </div>
      {isStudent ? (
        <>
          <p className="page-padding">
            Teacher:{" "}
            {currentCourse.teacherName.firstName +
              " " +
              currentCourse.teacherName.lastName}
          </p>
          <CourseDropdown user={user} currentCourse={currentCourse} />
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
          <p className="view-course-page__teacher-view-text page-padding">
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
