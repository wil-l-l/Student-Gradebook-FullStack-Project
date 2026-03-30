import { useLocation, useNavigate, useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./ManageCoursePage.css";

const ManageCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();
  const course = getCourseFromPeriod(user.courses, period);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {pathname === `${pathname}` && (
        <>
          <h2>Class Opened: {course.name}</h2>
          <div
            onClick={() => navigate(`/teacher/course/${period}/assignments`)}
            className="manage_course_page__prompt-block"
          >
            Assignments
          </div>
          <div
            onClick={() => navigate(`/teacher/course/${period}/students`)}
            className="manage_course_page__prompt-block"
          >
            Students
          </div>
        </>
      )}
    </>
  );
};

export default ManageCoursePage;
