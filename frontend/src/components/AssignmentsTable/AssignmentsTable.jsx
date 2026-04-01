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
  const pointsFormRef = useRef(null);
  const pointsForm = (maxPoints) => {
    return (
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            "Submitted new pointsEarned:",
            Number(pointsFormRef.current.value),
          );
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
        />
        /{maxPoints}
      </form>
    );
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
          assignments.map(({ name, type, pointsEarned, maxPoints }, index) => (
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
                  {isGradeEmpty(pointsEarned)
                    ? "N/A"
                    : `${pointsEarned}/${maxPoints}`}
                </p>
              )}
              <p className="assignments-table__list__item__text">
                {isGradeEmpty(pointsEarned)
                  ? "N/A"
                  : `${getGradePercentage(pointsEarned / maxPoints)}`}
              </p>
              <p className="assignments-table__list__item__text">
                {getLetterGrade(pointsEarned / maxPoints)}
              </p>
              <p className="assignments-table__list__item__text">{type.name}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default AssignmentsTable;
