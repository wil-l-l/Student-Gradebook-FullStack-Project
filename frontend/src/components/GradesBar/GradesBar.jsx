import sharedConstants from "../../../../sharedConstants";
import getGradePercentage from "../../utils/getGradePercentage";
import getLetterGrade from "../../utils/getLetterGrade";
import getWeightedGradeAsPercent from "../../utils/getWeightedGradeAsPercent";
import "./GradesBar.css";

const GradesBar = ({ assignments, updatedAssignments = null }) => {
  const getAssignmentTypesList = () => {
    const makeAssignmentTypes = [];
    for (let type in sharedConstants.assignmentTypes) {
      makeAssignmentTypes.push({
        type,
        weight: sharedConstants.assignmentTypes[type],
      });
    }
    return makeAssignmentTypes;
  };

  const getPointsPerCategory = () => {
    const pointsPerCategory = { ...sharedConstants.assignmentTypes };

    for (const type in pointsPerCategory)
      pointsPerCategory[type] = { pointsEarned: 0, maxPoints: 0 };

    assignments.forEach(({ pointsEarned, maxPoints, type }) => {
      pointsPerCategory[type.name].pointsEarned += pointsEarned;
      pointsPerCategory[type.name].maxPoints += maxPoints;
    });

    return pointsPerCategory;
  };
  const pointsPerCategory = getPointsPerCategory();
  const getPointsEarned = (type) => pointsPerCategory[type].pointsEarned;
  const getMaxPoints = (type) => pointsPerCategory[type].maxPoints;

  const getGrade = (type) => getPointsEarned(type) / getMaxPoints(type);

  const getGradeAsPercentPerCategory = (type) =>
    getGradePercentage(getGrade(type));

  const getCategoryDetails = (type) => (
    <p>
      {getPointsEarned(type)}/{getMaxPoints(type)}{" "}
      {getGradeAsPercentPerCategory(type)} {getLetterGrade(getGrade(type))}
    </p>
  );

  const getUpdatedAssignments = () =>
    [...assignments].map((originalAssignment) => {
      const updatedAssignment = updatedAssignments.find(
        (assignment) => assignment.id === originalAssignment._id,
      );
      if (updatedAssignment)
        return {
          ...originalAssignment,
          pointsEarned: updatedAssignment.updatedPoints,
        };
      return originalAssignment;
    });

  return (
    <>
      <p className="grades-bar__weight-grade bold-text">
        Weighted Grade:{" "}
        {updatedAssignments
          ? getWeightedGradeAsPercent(null, null, getUpdatedAssignments())
          : getWeightedGradeAsPercent(null, null, assignments)}
      </p>
      <ul className="grades-bar-list">
        Assignment Weights:
        <br />
        Points Per Category:
        {getAssignmentTypesList()
          .toSorted((a, b) =>
            a.weight < b.weight ? 1 : a.weight > b.weight ? -1 : 0,
          )
          .map(({ type, weight }) => (
            <li key={type} className="grades-bar__item">
              {`${type[0].toUpperCase() + type.slice(1)}`} {weight}%
              {isNaN(getGrade(type)) ? <p>N/A</p> : getCategoryDetails(type)}
            </li>
          ))}
      </ul>
    </>
  );
};

export default GradesBar;
