import "./StudentDropdown.css";

const StudentDropdown = ({
  students,
  currentStudent,
  setCurrentStudent,
  setEditMode,
}) => {
  return (
    <div className="student-dropdown-box">
      <p>Current Student: {currentStudent}</p>
      <form>
        <label htmlFor="student-dropdown">Select Different Student:</label>
        <select
          id="student-dropdown"
          defaultValue={""}
          onChange={(e) => {
            setCurrentStudent(e.target.value);
            setEditMode(null);
          }}
          className="student-dropdown"
        >
          <option value="" disabled hidden></option>
          {[...Array(students.length).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default StudentDropdown;
