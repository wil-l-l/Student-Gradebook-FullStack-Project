import getLetterGrade from "../../utils/getLetterGrade";
import isGradeEmpty from "../../utils/isGradeEmpty";
import "./AssignmentsTable.css";
import getGradePercentage from "../../utils/getGradePercentage";
import { useParams } from "react-router";
import { useState, useRef } from "react";

const AssignmentsTable = ({ assignments }) => {
  const { id } = useParams();
  const [cellClicked, setCellClicked] = useState(null);
  const [newPointsEarned, setNewPointsEarned] = useState(0);
  const [updatedAssignments, setUpdatedAssignments] = useState([]);
  const pointsFormRef = useRef(null);

  const clearPointsInput = () => {
    setCellClicked(null);
    setNewPointsEarned(0);
  };

  const pointsForm = (maxPoints) => {
    return (
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const pointsEarnedToSubmit = Number(pointsFormRef.current.value);

          const assignmentToUpdate = assignments[cellClicked];
          const assignmentId = assignmentToUpdate._id;

          const updateAssignmentGrade = async () => {
            let updateResponse = await fetch(
              `/api/assignments/${assignmentId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  studentId: id,
                  pointsEarned: pointsEarnedToSubmit,
                }),
              },
            );
            updateResponse = await updateResponse.json();

            if (updateResponse.success) {
              const updatedAssignmentDetails = {
                updatedPoints: pointsEarnedToSubmit,
                percent: getGradePercentage(pointsEarnedToSubmit / maxPoints),
                grade: getLetterGrade(pointsEarnedToSubmit / maxPoints),
              };

              const addNewAssignmentToUpdatedAssignments = () => {
                setUpdatedAssignments([
                  ...updatedAssignments,
                  {
                    ...updatedAssignmentDetails,
                    id: assignmentId,
                  },
                ]);
              };

              if (updatedAssignments.length > 0) {
                const result = updatedAssignments.find(
                  (assignment) => assignment.id === assignmentId,
                );
                if (result) {
                  setUpdatedAssignments(
                    updatedAssignments.map(
                      (
                        assignment, // don't destructure
                      ) =>
                        assignment.id === assignmentId
                          ? {
                              ...assignment,
                              ...updatedAssignmentDetails,
                            }
                          : assignment,
                    ),
                  );
                } else addNewAssignmentToUpdatedAssignments();
              } else addNewAssignmentToUpdatedAssignments();

              clearPointsInput();
            }
          };
          updateAssignmentGrade();
        }}
      >
        <input
          className="assignments-table__points-earned-input"
          type="number"
          min={0}
          max={maxPoints}
          value={newPointsEarned}
          ref={pointsFormRef}
          autoFocus
          name=""
          id=""
          onChange={(e) => setNewPointsEarned(Number(e.target.value))}
          onKeyDown={({ key }) => key === "Escape" && clearPointsInput()}
        />
        /{maxPoints}
      </form>
    );
  };

  const getUpdatedAssignment = (assignmentId) => {
    return updatedAssignments.find(({ id }) => id === assignmentId);
  };

  return (
    <>
      <div className="assignments-table__info-bar">
        <p className="assignments-table__info-bar__item">Assignment:</p>
        <p className="assignments-table__info-bar__item">Points:</p>
        <p className="assignments-table__info-bar__item">Percent:</p>
        <p className="assignments-table__info-bar__item">Grade:</p>
        <p className="assignments-table__info-bar__item">Type:</p>
      </div>
      <ul className="assignments-table__list">
        {assignments.length === 0 ? (
          <p className="assignments-table__list__item__text">
            No assignments published for this class yet.
          </p>
        ) : (
          assignments.map(
            ({ name, type, pointsEarned, maxPoints, _id }, index) => (
              <li
                className="assignments-table__list__item"
                key={name + type.classwork}
              >
                <p className="assignments-table__list__item__text">{name}</p>
                {cellClicked === index ? (
                  <>{pointsForm(maxPoints)}</>
                ) : (
                  <p
                    onClick={() => {
                      setCellClicked(index);
                      setNewPointsEarned(0);
                    }}
                    className="assignments-table__list__item__text"
                  >
                    {getUpdatedAssignment(_id)
                      ? `${getUpdatedAssignment(_id).updatedPoints}/${maxPoints}`
                      : isGradeEmpty(pointsEarned)
                        ? "N/A"
                        : `${pointsEarned}/${maxPoints}`}
                  </p>
                )}
                <p className="assignments-table__list__item__text">
                  {getUpdatedAssignment(_id)
                    ? getUpdatedAssignment(_id).percent
                    : isGradeEmpty(pointsEarned)
                      ? "N/A"
                      : `${getGradePercentage(pointsEarned / maxPoints)}`}
                </p>
                <p className="assignments-table__list__item__text">
                  {getUpdatedAssignment(_id)
                    ? getUpdatedAssignment(_id).grade
                    : getLetterGrade(pointsEarned / maxPoints)}
                </p>
                <p className="assignments-table__list__item__text">
                  {type.name}
                </p>
              </li>
            ),
          )
        )}
      </ul>
    </>
  );
};

export default AssignmentsTable;
