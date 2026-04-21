import getLetterGrade from "../../utils/getLetterGrade";
import isGradeEmpty from "../../utils/isGradeEmpty";
import "./AssignmentsTable.css";
import getGradePercentage from "../../utils/getGradePercentage";
import { useParams } from "react-router";
import { useState, useRef } from "react";
import AssignmentPointsForm from "./AssignmentPointsForm/AssignmentPointsForm";

const AssignmentsTable = ({
  assignments,
  // Everything marked 'null' are props only a teacher uses in this component
  teacherUserName = null,
  updatedAssignments = null,
  setUpdatedAssignments = null,
}) => {
  const { id } = useParams(); // id = studentId
  const [cellClicked, setCellClicked] = useState(null);
  const [newPointsEarned, setNewPointsEarned] = useState(0);
  const pointsFormRef = useRef(null);

  const getTeacherListItem = (
    index,
    _id,
    name,
    pointsEarned,
    maxPoints,
    type,
  ) => {
    return (
      <li className="assignments-table__list__item" key={_id}>
        <p className="assignments-table__list__item__text">{name}</p>
        {cellClicked === index ? (
          <AssignmentPointsForm
            assignments={assignments}
            updatedAssignmentsState={{
              state: updatedAssignments,
              set: setUpdatedAssignments,
            }}
            cellClickedState={{
              state: cellClicked,
              set: setCellClicked,
            }}
            newPointsEarnedState={{
              state: newPointsEarned,
              set: setNewPointsEarned,
            }}
            pointsFormRef={pointsFormRef}
            maxPoints={maxPoints}
            studentId={id}
            teacherUserName={teacherUserName}
          />
        ) : (
          <p
            onClick={(e) => {
              if (e.target.innerHTML === "N/A") return;
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
        <p className="assignments-table__list__item__text">{type.name}</p>
      </li>
    );
  };

  const getUpdatedAssignment = (assignmentId) =>
    updatedAssignments.find(({ id }) => id === assignmentId);

  return (
    <>
      <section className="assignments-table">
        <div className="assignments-table__info-bar">
          <p className="assignments-table__info-bar__item ">Assignment:</p>
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
              ({ name, type, pointsEarned, maxPoints, _id }, index) =>
                teacherUserName === null ? (
                  <li className="assignments-table__list__item" key={_id}>
                    <p className="assignments-table__list__item__text">
                      {name}
                    </p>
                    <p className="assignments-table__list__item__text">
                      {isGradeEmpty(pointsEarned)
                        ? "N/A"
                        : `${pointsEarned}/${maxPoints}`}
                    </p>
                    <p className="assignments-table__list__item__text">
                      {isGradeEmpty(pointsEarned)
                        ? "N/A"
                        : `${getGradePercentage(pointsEarned / maxPoints)}`}
                    </p>
                    <p className="assignments-table__list__item__text">
                      {getLetterGrade(pointsEarned / maxPoints)}
                    </p>
                    <p className="assignments-table__list__item__text">
                      {type.name}
                    </p>
                  </li>
                ) : (
                  getTeacherListItem(
                    index,
                    _id,
                    name,
                    pointsEarned,
                    maxPoints,
                    type,
                  )
                ),
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default AssignmentsTable;
