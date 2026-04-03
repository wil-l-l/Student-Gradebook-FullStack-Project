import { useEffect, useState, useContext } from "react";
import "./ReviewBulkGrades.css";
import PointsForm from "../PointsForm/PointsForm";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router";

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
  const [doGradeSubmission, setDoGradeSubmission] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { period } = useParams();

  useEffect(() => {
    setThisGradedStudents(trackGradedStudents);
  }, [trackGradedStudents]);

  useEffect(() => {
    if (doGradeSubmission === true) {
      thisGradedStudents.forEach(async ({ _id, pointsEarned }) => {
        fetch(`/api/assignments/${assignment._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: _id,
            teacherUserName: user.userName,
            pointsEarned,
          }),
        });
      });
      navigate(`/teacher/course/${period}/assignments`, {
        state: {
          wasModified: true,
        },
      });
    }
  }, [
    doGradeSubmission,
    thisGradedStudents,
    user.userName,
    assignment,
    navigate,
    period,
  ]);

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
              onClick={() => {
                if (thisGradedStudents.every(({ isGraded }) => isGraded)) {
                  setDoGradeSubmission(true);
                } else {
                  console.log(
                    "All assignments are not graded, show an error message and/or visual cue.",
                  );
                }
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
