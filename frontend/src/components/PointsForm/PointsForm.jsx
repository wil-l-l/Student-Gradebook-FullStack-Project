import "./PointsForm.css";
import { useRef, useState, useEffect } from "react";

const PointsForm = ({
  courseStudents,
  currentStudentIndex,
  trackGradedStudents,
  setTrackGradedStudents,
  assignment,
  setCurrentStudentIndex,
}) => {
  const [points, setPoints] = useState("");
  const pointsInputRef = useRef(null);

  const moveToNextStudent = () =>
    setCurrentStudentIndex(currentStudentIndex + 1);

  useEffect(() => {
    if (pointsInputRef.current) pointsInputRef.current.focus();
  }, [currentStudentIndex]);

  return (
    <form
      className="bulk-grade-page__points-form"
      onSubmit={(e) => {
        e.preventDefault();

        const studentJustGraded = {
          ...courseStudents[currentStudentIndex],
          isGraded: false,
        };

        if (points === 0 || (points && Number(points) >= 0)) {
          studentJustGraded.isGraded = true;
          studentJustGraded.pointsEarned = points;
        }

        setTrackGradedStudents([...trackGradedStudents, studentJustGraded]);

        setPoints("");

        if (trackGradedStudents.length === courseStudents.length) return;
        moveToNextStudent();
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
  );
};

export default PointsForm;
