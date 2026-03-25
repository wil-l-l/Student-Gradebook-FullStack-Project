import { useRef, useState } from "react";
import "./BulkGradePage.css";
import { useEffect } from "react";

const BulkGradePage = ({ course, assignment }) => {
  const [points, setPoints] = useState("");
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [trackGradedStudents, setTrackGradedStudents] = useState([]);
  const pointsInputRef = useRef(null);

  const courseStudents = [...course.students];
  const currentStudent = courseStudents[currentStudentIndex];

  const moveToNextStudent = () =>
    setCurrentStudentIndex(currentStudentIndex + 1);

  const getFullName = (student = currentStudent) =>
    student ? student.firstName + " " + student.lastName : "";

  useEffect(() => {
    if (pointsInputRef.current) pointsInputRef.current.focus();
  }, [currentStudentIndex]);

  return (
    <div className="bulk-grade-page">
      {trackGradedStudents.length !== courseStudents.length ? (
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

              if (points === 0 || (points && Number(points) >= 0)) {
                studentJustGraded.isGraded = true;
                studentJustGraded.pointsEarned = points;
              }

              setTrackGradedStudents([
                ...trackGradedStudents,
                studentJustGraded,
              ]);

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
                  <span className="bulk-grade-page__points-box__bar-span">
                    /
                  </span>
                  <span className="bulk-grade-page__points-box__PTS-text">
                    {assignment.maxPoints}
                  </span>
                </p>
              </div>
              <button
                className="bulk-grade-page__arrow"
                onClick={() => setPoints("")}
              >
                NEXT
              </button>
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
      ) : (
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
      )}
    </div>
  );
};

export default BulkGradePage;
