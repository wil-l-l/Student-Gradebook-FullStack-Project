import "./CourseDropdown.css";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";

const CourseDropdown = ({ user, currentCourse, setCurrentCourse }) => {
  const courses = user.courses;

  return (
    <form className="course-dropdown-form">
      <label htmlFor="course-dropdown">Switch Course:</label>
      <select
        id="course-dropdown"
        defaultValue={""}
        onChange={(e) =>
          setCurrentCourse(getCourseFromPeriod(courses, e.target.value))
        }
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
