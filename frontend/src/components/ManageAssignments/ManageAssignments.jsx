import { useState } from "react";
import PublishAssignmentForm from "../PublishAssignmentForm/PublishAssignmentForm";
import BulkGradePage from "../../pages/BulkGradePage/BulkGradePage";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./ManageAssignments.css";

const ManageAssignments = () => {
  const [enterBulkGrade, setEnterBulkGrade] = useState(false);
  const [assignmentToGrade, setAssignmentToGrade] = useState(null);
  const { user } = useContext(UserContext);
  const { period } = useParams();

  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;

  return (
    <>
      {courseAssignments.length > 0 && enterBulkGrade ? (
        <BulkGradePage course={course} assignment={assignmentToGrade} />
      ) : courseAssignments.length > 0 && enterBulkGrade === false ? (
        <>
          <ul className="manage-assignments-assignments-list">
            {courseAssignments.map((assignmentObj, index) => (
              <li
                className="manage-assignments-assignments-list__item"
                key={assignmentObj.name + index}
                onClick={() => {
                  setEnterBulkGrade(true);
                  setAssignmentToGrade(assignmentObj);
                }}
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
          <p>Publish an assignment to get started! </p>
          <PublishAssignmentForm selectedCourse={course} />
        </>
      )}
    </>
  );
};

export default ManageAssignments;
