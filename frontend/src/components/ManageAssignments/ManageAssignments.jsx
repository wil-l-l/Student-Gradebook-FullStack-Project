import { useState } from "react";
import PublishAssignmentForm from "../PublishAssignmentForm/PublishAssignmentForm";
import "./ManageAssignments.css";
import BulkGradePage from "../../pages/BulkGradePage/BulkGradePage";

const ManageAssignments = ({ selectedCourse }) => {
  const [enterBulkGrade, setEnterBulkGrade] = useState(false);
  const [assignmentToGrade, setAssignmentToGrade] = useState(null);

  return (
    <>
      {selectedCourse.assignments.length > 0 && enterBulkGrade ? (
        <BulkGradePage course={selectedCourse} assignment={assignmentToGrade} />
      ) : selectedCourse.assignments.length > 0 && enterBulkGrade === false ? (
        <>
          <ul className="manage-assignments-assignments-list">
            {selectedCourse.assignments.map((assignmentObj, index) => (
              <li
                className="manage-assignments-assignments-list__item"
                key={assignmentObj.name + index}
                onClick={(e) => {
                  console.log(e.target);
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
          <PublishAssignmentForm selectedCourse={selectedCourse} />
        </>
      )}
    </>
  );
};

export default ManageAssignments;
