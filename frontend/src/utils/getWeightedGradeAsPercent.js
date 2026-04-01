import getCourseFromPeriod from "./getCourseFromPeriod";
import getRoundedGrade from "./getRoundedGrade";
import sharedConstants from "../../../sharedConstants";
import getGradePercentage from "./getGradePercentage";

const getWeightedGradeAsPercent = (user, period) => {
  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;
  if (courseAssignments.length === 0) return "N/A";

  let ungradedAssignments = 0;
  const weightedGradeAsDecimal = courseAssignments.reduce(
    (accumulator, { isGraded, pointsEarned, maxPoints, type }) => {
      if (isGraded === false) {
        ungradedAssignments += 1;
        return accumulator;
      }

      const assigmentWeight = sharedConstants.assignmentTypes[type.name] / 100;

      return (
        accumulator +
        getRoundedGrade(pointsEarned / maxPoints) * assigmentWeight
      );
    },
    0,
  );

  return ungradedAssignments === courseAssignments.length
    ? "N/A"
    : getGradePercentage(weightedGradeAsDecimal);
};
export default getWeightedGradeAsPercent;
