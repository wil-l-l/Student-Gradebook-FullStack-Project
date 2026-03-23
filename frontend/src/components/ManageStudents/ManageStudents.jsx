import "./ManageStudents.css";

const ManageStudents = ({ selectedCourse }) => {
  return (
    <>
      <ul>
        {selectedCourse.students.map(
          ({ firstName, lastName, grade }, index) => (
            <li key={firstName + lastName + grade + index}>
              {firstName}, {lastName} <br />
              Grade: {grade}
            </li>
          ),
        )}
      </ul>
    </>
  );
};

export default ManageStudents;
