import "./ViewCoursePage.css";
import AssignmentsTable from "../../components/AssignmentsTable/AssignmentsTable";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";

const ViewCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period, id } = useParams();
  const [loadedStudentData, setLoadedStudentData] = useState(null);

  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;
  const isStudent = user.isStudent;

  useEffect(() => {
    const getStudent = async () => {
      let response = await fetch(`/api/users/${id}`);
      response = await response.json();
      const studentData = response.data;
      setLoadedStudentData(studentData);
    };
    if (isStudent === false) getStudent();
  }, [isStudent, setLoadedStudentData, id, courseAssignments, period]);

  return (
    <section className="view-course-page">
      <div className="view_course_page__course-info-bar">
        <h2>Course: {course.name}</h2>
        <p>Period: {course.period}</p>
      </div>
      {loadedStudentData === null && isStudent === false ? (
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
          <AssignmentsTable
            assignments={
              isStudent
                ? courseAssignments
                : getCourseFromPeriod(loadedStudentData.courses, period)
                    .assignments
            }
          />
        </>
      )}
    </section>
  );
};

export default ViewCoursePage;
