import "./ReviewBulkGrades.css";

const ReviewBulkGrades = ({ trackGradedStudents, getFullName }) => {
  return (
    <ul className="bulk-grade-page__review-students-list">
      {trackGradedStudents.map((studentObj) => (
        <li
          key={studentObj._id}
          className="bulk-grade-page__review-students-list__item"
          onClick={(e) => {
            console.log(e.target);
          }}
        >
          {studentObj.isGraded ? (
            <span className="green-text">graded</span>
          ) : (
            <span className="red-text bold-text">NOT GRADED</span>
          )}
          <p>{getFullName(studentObj)}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReviewBulkGrades;
