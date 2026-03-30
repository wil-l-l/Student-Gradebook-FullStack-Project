import { useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./ManageStudents.css";

const ManageStudents = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();
  const course = getCourseFromPeriod(user.courses, period);

  return (
    <>
      <ul>
        {course.students.map(({ firstName, lastName, grade }, index) => (
          <li
            onClick={() => {
              console.log(firstName, lastName);
            }}
            className="manage-students__list-item"
            key={firstName + lastName + grade + index}
          >
            {firstName}, {lastName} <br />
            Grade: {grade}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ManageStudents;
