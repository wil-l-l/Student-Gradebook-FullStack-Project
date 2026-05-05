import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./ManageAssignments.css";

const ManageAssignments = () => {
  const { user, setUser } = useContext(UserContext);
  const { period } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const publishAssignmentRoute = `/teacher/course/${period}/assignments/publish`;
  const [course, setCourse] = useState(
    getCourseFromPeriod(user.courses, period),
  );
  const courseAssignments = course.assignments;

  useEffect(() => {
    if (state && state.wasModified) {
      const fetchAssignments = async () => {
        const response = await fetch(
          `https://gradebook-backend-pmo7.onrender.com/api/users/${user._id}`,
        );
        const responseBody = await response.json();
        const updatedTeacher = responseBody.data;
        setUser(updatedTeacher);

        setCourse(getCourseFromPeriod(updatedTeacher.courses, period));
      };
      fetchAssignments();
    }
  }, [state, user.userName, period, user.courses, user._id, setUser]);

  return (
    <>
      {courseAssignments.length > 0 ? (
        <div className="manage-assignment__assignments-box">
          <p className="manage-assignment__heading-text bold-text">{`${course.name}`}</p>
          <div className="manage-assignment__assignments-box__head-box">
            <p className="manage-assignment__heading-text bold-text">
              Assignments:
            </p>
            <button
              onClick={() => navigate(publishAssignmentRoute)}
              className="manage-assignments__create-btn"
            >
              CREATE
            </button>
          </div>
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
        </div>
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
