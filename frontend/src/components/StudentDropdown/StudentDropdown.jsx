import "./StudentDropdown.css";

const StudentDropdown = ({ students, currentStudent, setCurrentStudentId }) => {
  return (
    <form className="student-dropdown-form page-padding">
      <label htmlFor="student-dropdown">Switch Student:</label>
      <select
        id="student-dropdown"
        defaultValue={""}
        onChange={(e) => {
          setCurrentStudentId(e.target.value);
        }}
        className="student-dropdown"
      >
        {students
          .toSorted((a) => (a.firstName === currentStudent.firstName ? -1 : 0))
          .map(({ firstName, lastName, _id }) => (
            <option key={_id} value={_id}>
              {firstName + " " + lastName}
            </option>
          ))}
      </select>
    </form>
  );
};

export default StudentDropdown;
