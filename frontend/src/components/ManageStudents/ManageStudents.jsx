import "./ManageStudents.css";

const ManageStudents = ({ selectedCourse }) => {
  return (
    <>
      <ul>
        {selectedCourse.students.map(
          ({ firstName, lastName, grade }, index) => (
            <li
              onClick={() => {
                console.log(selectedCourse);
              }}
              className="manage-students__list-item"
              key={firstName + lastName + grade + index}
            >
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
