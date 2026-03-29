import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";

const AssignmentsTable = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();

  const course = user.courses.find(
    (courseObj) => courseObj.period === Number(period),
  );
  const assignments = course.assignments;

  return (
    <div className="view_course_page__assignments-bar">
      <h2>Assignments</h2>
      <ul>
        {assignments.length === 0 ? (
          <p>No assignments published for this class yet.</p>
        ) : (
          assignments.map(({ name, type, pointsEarned, maxPoints }) => (
            <li key={name + type.classwork}>
              {name} {pointsEarned}/{maxPoints}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AssignmentsTable;
