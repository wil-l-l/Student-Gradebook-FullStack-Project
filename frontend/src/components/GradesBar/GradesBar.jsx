import sharedConstants from "../../../../sharedConstants";
import "./GradesBar.css";

const GradesBar = () => {
  const getAssignmentTypesList = () => {
    const makeAssignmentTypes = [];
    for (let type in sharedConstants.assignmentTypes) {
      makeAssignmentTypes.push({
        type: type === "assessment" ? type + "s" : type,
        weight: sharedConstants.assignmentTypes[type],
      });
    }
    return makeAssignmentTypes;
  };

  return (
    <ul className="grades-bar">
      Grade Breakdown:
      {getAssignmentTypesList()
        .toSorted((a, b) =>
          a.weight < b.weight ? 1 : a.weight > b.weight ? -1 : 0,
        )
        .map(({ type, weight }) => (
          <li className="grades-bar__item">
            {type[0].toUpperCase() + type.slice(1)} {weight}%
          </li>
        ))}
    </ul>
  );
};

export default GradesBar;
