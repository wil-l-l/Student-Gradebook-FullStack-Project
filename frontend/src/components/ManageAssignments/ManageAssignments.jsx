import PublishAssignmentForm from "../PublishAssignmentForm/PublishAssignmentForm";
import "./ManageAssignments.css";

const ManageAssignments = ({ selectedCourse }) => {
  return (
    <>
      {selectedCourse.assignments.length > 0 ? (
        <ul>
          {selectedCourse.assignments.map(({ name }) => (
            <li>{name}</li>
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
