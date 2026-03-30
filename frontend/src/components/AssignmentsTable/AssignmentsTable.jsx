import getLetterGrade from "../../utils/getLetterGrade";
import isGradeEmpty from "../../utils/isGradeEmpty";
import "./AssignmentsTable.css";
import getGradePercentage from "../../utils/getGradePercentage";

const AssignmentsTable = ({ assignments }) => {
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
          assignments.map(({ name, type, pointsEarned, maxPoints }) => (
            <li
              className="assignments-table__list__item"
              key={name + type.classwork}
            >
              <p className="assignments-table__list__item__text">{name}</p>
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
              <p className="assignments-table__list__item__text">{type.name}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default AssignmentsTable;
