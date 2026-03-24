import PublishAssignmentForm from "../PublishAssignmentForm/PublishAssignmentForm";
import "./ManageAssignments.css";

const ManageAssignments = ({ selectedCourse }) => {
  return (
    <>
      {selectedCourse.assignments.length > 0 ? (
        <ul className="manage-assignments-assignments-list">
          {selectedCourse.assignments.map(({ name, isGraded }) => (
            <li
              className="manage-assignments-assignments-list__item"
              key={name}
              onClick={(e) => console.log(e.target)}
            >
              {isGraded === false ? (
                <span className="red-text">NOT GRADED</span>
              ) : (
                <span className="green-text">graded</span>
              )}{" "}
              {name}
            </li>
          ))}
        </ul>
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
