import "./ViewCoursePage.css";
import AssignmentsTable from "../../components/AssignmentsTable/AssignmentsTable";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";

const ViewCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period, id } = useParams();
  const [loadedCourseAssignments, setLoadedCourseAssignments] = useState(null);

  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;
  const isStudent = user.isStudent;

  useEffect(() => {
    const getStudent = async () => {
      let response = await fetch(`/api/users/${id}`);
      response = await response.json();
      const studentData = response.data;

      const studentCourse = getCourseFromPeriod(studentData.courses, period);
      setLoadedCourseAssignments(studentCourse.assignments);
    };
    if (isStudent === false) getStudent();
  }, [isStudent, setLoadedCourseAssignments, id, courseAssignments, period]);

  return (
    <section className="view-course-page">
      <div className="view_course_page__course-info-bar">
        <h2>Course: {course.name}</h2>
        <p>Period: {course.period}</p>
      </div>
      {loadedCourseAssignments === null && isStudent === false ? (
        <p>Loading course assignments for student...</p>
      ) : (
        <AssignmentsTable
          assignments={isStudent ? courseAssignments : loadedCourseAssignments}
        />
      )}
    </section>
  );
};

export default ViewCoursePage;
