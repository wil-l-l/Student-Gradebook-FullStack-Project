import "./PointsForm.css";
import { useRef, useState, useEffect } from "react";

const PointsForm = ({
  courseStudents,
  currentStudentIndex,
  trackGradedStudents,
  setTrackGradedStudents,
  assignment,
  getFullName,
  setCurrentStudentIndex = null,
  setGradeOneStudent = null,
}) => {
  const [points, setPoints] = useState("");
  const pointsInputRef = useRef(null);

  const moveToNextStudent = () =>
    setCurrentStudentIndex(currentStudentIndex + 1);

  useEffect(() => {
    if (pointsInputRef.current) pointsInputRef.current.focus();
  }, [currentStudentIndex]);

  return (
    <>
      <p className="bulk-grade-page__student-name">{getFullName()}</p>
      <form
        className="bulk-grade-page__points-form"
        onSubmit={(e) => {
          e.preventDefault();

          const studentJustGraded = {
            ...courseStudents[currentStudentIndex],
            isGraded: false,
          };
          let keepOriginal = null;

          if (points === 0 || (points && Number(points) >= 0)) {
            studentJustGraded.isGraded = true;
            studentJustGraded.pointsEarned = points;
            if (setGradeOneStudent) keepOriginal = false;
          }
          if (points === "" && setGradeOneStudent) keepOriginal = true; // Grade of the student selected in the points form single student view did not change

          // Grading a single student
          if (setCurrentStudentIndex === null) {
            const newGradedStudents = trackGradedStudents.map(
              (studentObj, index) =>
                index === currentStudentIndex
                  ? keepOriginal === false
                    ? studentJustGraded
                    : studentObj
                  : studentObj,
            );
            setTrackGradedStudents(newGradedStudents);
            setGradeOneStudent(null);
            setPoints("");
          } else {
            if (trackGradedStudents.length === courseStudents.length) return;
            moveToNextStudent();
            setTrackGradedStudents([...trackGradedStudents, studentJustGraded]);
            setPoints("");
          }
        }}
      >
        <div className="bulk-grade-page__points-form__points-and-arrow-box">
          <div className="bulk-grade-page__points-box">
            <input
              ref={pointsInputRef}
              type="number"
              className="bulk-grade-page__points-input"
              autoFocus
              value={points}
              min={0}
              max={assignment.maxPoints}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
            <p>
              <span className="bulk-grade-page__points-box__bar-span">/</span>
              <span className="bulk-grade-page__points-box__PTS-text">
                {assignment.maxPoints}
              </span>
            </p>
          </div>
          <button className="bulk-grade-page__arrow">NEXT</button>
        </div>

        <div className="bulk-grade-page__missing-grade-btns-box">
          <button
            className="bulk-grade-page__missing-grade-btn"
            onClick={() => setPoints(0)}
          >
            MISSING
          </button>
        </div>
      </form>
    </>
  );
};

export default PointsForm;
