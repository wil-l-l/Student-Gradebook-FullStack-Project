import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./ManageAssignments.css";

const ManageAssignments = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();
  const navigate = useNavigate();

  const publishAssignmentRoute = `/teacher/course/${period}/assignments/publish`;
  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;

  return (
    <>
      {courseAssignments.length > 0 ? (
        <>
          <button
            onClick={() => navigate(publishAssignmentRoute)}
            className="manage-assignments__create-btn"
          >
            Create & Publish an Assignment
          </button>
          <ul className="manage-assignments-assignments-list">
            {courseAssignments.map((assignmentObj, index) => (
              <li
                className="manage-assignments-assignments-list__item"
                key={assignmentObj.name + index}
                onClick={() =>
                  navigate(
                    `/teacher/course/${period}/assignments/bulk-grade/${assignmentObj._id}`,
                  )
                }
              >
                {assignmentObj.isGraded === false ? (
                  <span className="red-text">NOT GRADED</span>
                ) : (
                  <span className="green-text">graded</span>
                )}{" "}
                {assignmentObj.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Link to={publishAssignmentRoute}>
            Publish an assignment to get started!
          </Link>
        </>
      )}
    </>
  );
};

export default ManageAssignments;
