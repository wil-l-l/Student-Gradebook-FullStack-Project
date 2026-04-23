import "./CourseDropdown.css";
import { useNavigate } from "react-router";

const CourseDropdown = ({ user, currentCourse }) => {
  const courses = user.courses;
  const navigate = useNavigate();

  return (
    <form className="course-dropdown-form page-padding">
      <label htmlFor="course-dropdown">Switch Course:</label>
      <select
        id="course-dropdown"
        defaultValue={""}
        onChange={(e) => navigate(`/student/course/${e.target.value}`)}
        className="course-dropdown"
      >
        {courses
          .toSorted((a) => (currentCourse.name === a.name ? -1 : 0))
          .map(({ name, period, id }) => (
            <option key={id} value={period}>
              {`${name}, Period: ${period}`}
            </option>
          ))}
      </select>
    </form>
  );
};

export default CourseDropdown;
