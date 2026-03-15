import "./GradeTable.css";
import GradeRows from "./GradeRows/GradeRows";

const GradeTable = ({
  studentToView,
  currentStudent,
  editMode,
  students,
  setStudents
}) => {
  return (
    <table className="grade-table">
      <thead className="grade-table__heading-row">
        <tr>
          <th>Pd</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <GradeRows
          currentStudent={currentStudent}
          studentToView={studentToView}
          editMode={editMode}
          students={students}
          setStudents={setStudents}
        />
      </tbody>
    </table>
  );
};

export default GradeTable;
