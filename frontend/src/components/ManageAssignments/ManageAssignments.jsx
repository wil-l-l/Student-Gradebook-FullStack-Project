import "./ManageAssignments.css";

const ManageAssignments = ({ selectedCourse }) => {
  return (
    <>
      {selectedCourse.assignments.length > 0 ? (
        <ul>Render assignments list</ul>
      ) : (
        <p>Publish an assignment to get started! </p>
      )}
    </>
  );
};

export default ManageAssignments;
