import "./ViewCoursePage.css";
import AssignmentsTable from "../../components/AssignmentsTable/AssignmentsTable";
import { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const ViewCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();

  const course = user.courses.find(
    (courseObj) => courseObj.period === Number(period),
  );
  const assignments = course.assignments;

  return (
    <section className="view-course-page">
      <div className="view_course_page__course-info-bar">
        <h2>Course: {course.name}</h2>
        <p>Period: {course.period}</p>
      </div>
      <AssignmentsTable assignments={assignments} />
    </section>
  );
};

export default ViewCoursePage;
