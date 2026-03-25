import { useState } from "react";
import "./ReviewBulkGrades.css";

const ReviewBulkGrades = ({ trackGradedStudents, getFullName }) => {
  const [markAllMissing, setMarkAllMissing] = useState(false);
  const [thisGradedStudents, setThisGradedStudents] = useState([
    ...trackGradedStudents,
  ]);

  return (
    <>
      <form
        className="review-bulk-grades__mark-missing-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="all-missing-checkbox">
          Mark all <span className="red-text bold-text">NOT GRADED</span> as
          MISSING 0s
        </label>
        <input
          type="checkbox"
          name="all-missing-checkbox"
          id=""
          className="review-bulk-grades__mark-missing-checkbox"
          onChange={() => {
            const newMarkAllMissing = !markAllMissing;
            setMarkAllMissing(newMarkAllMissing);

            if (newMarkAllMissing) {
              const newStudents = thisGradedStudents.map((studentObj) => {
                return { ...studentObj, isGraded: true, grade: 0 };
              });
              setThisGradedStudents(newStudents);
            } else setThisGradedStudents([...trackGradedStudents]);
          }}
        />
      </form>
      <ul className="bulk-grade-page__review-students-list">
        {thisGradedStudents.map((studentObj) => (
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
    </>
  );
};

export default ReviewBulkGrades;
