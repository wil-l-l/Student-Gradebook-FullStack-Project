import { useEffect, useState } from "react";
import "./ReviewBulkGrades.css";
import PointsForm from "../PointsForm/PointsForm";

const ReviewBulkGrades = ({
  courseStudents,
  currentStudentIndex,
  trackGradedStudents,
  setTrackGradedStudents,
  assignment,
  setCurrentStudentIndex,
  getFullName,
}) => {
  const [markAllMissing, setMarkAllMissing] = useState(false);
  const [thisGradedStudents, setThisGradedStudents] = useState([
    ...trackGradedStudents,
  ]);
  const [gradeOneStudent, setGradeOneStudent] = useState(null);

  useEffect(() => {
    setThisGradedStudents(trackGradedStudents);
  }, [trackGradedStudents]);

  return (
    <>
      {gradeOneStudent === null ? (
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
            {thisGradedStudents.map((studentObj, index) => (
              <li
                key={studentObj._id}
                className="bulk-grade-page__review-students-list__item"
                onClick={() => {
                  setGradeOneStudent(studentObj);
                  setCurrentStudentIndex(index);
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
            <button
              className="review-bulk-grades__submit-btn bold-text"
              onClick={(e) => {
                console.log(e.target);
              }}
            >
              SUBMIT GRADES
            </button>
          </ul>
        </>
      ) : (
        <PointsForm
          courseStudents={courseStudents}
          currentStudentIndex={currentStudentIndex}
          trackGradedStudents={trackGradedStudents}
          setTrackGradedStudents={setTrackGradedStudents}
          assignment={assignment}
          getFullName={getFullName}
          setGradeOneStudent={setGradeOneStudent}
        />
      )}
    </>
  );
};

export default ReviewBulkGrades;
