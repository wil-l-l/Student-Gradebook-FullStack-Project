import { useState } from "react";
import "./BulkGradePage.css";

const BulkGradePage = ({ course, assignment }) => {
  const [points, setPoints] = useState("");
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [trackGradedStudents, setTrackGradedStudents] = useState([]);

  const courseStudents = [...course.students];
  const currentStudent = courseStudents[currentStudentIndex];

  const moveToNextStudent = () =>
    setCurrentStudentIndex(currentStudentIndex + 1);

  const getFullName = (student = currentStudent) =>
    student ? student.firstName + " " + student.lastName : "";

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
                  type="number"
                  className="bulk-grade-page__points-input"
                  placeholder=""
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
          {trackGradedStudents.map((studentObj) =>
            studentObj.isGraded ? (
              <li
                key={studentObj._id}
                className="bulk-grade-page__review-students-list__item"
                onClick={(e) => {
                  console.log(e.target);
                }}
              >
                <span className="green-text">graded</span>{" "}
                <p>{getFullName(studentObj)}</p>
              </li>
            ) : (
              <li
                key={studentObj._id}
                className="bulk-grade-page__review-students-list__item"
                onClick={(e) => {
                  console.log(e.target);
                }}
              >
                <span className="red-text bold-text">NOT GRADED</span>{" "}
                <p>{getFullName(studentObj)}</p>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default BulkGradePage;
