import getCourseFromPeriod from "./getCourseFromPeriod";
import sharedConstants from "../../../sharedConstants";
import getGradePercentage from "./getGradePercentage";

const getWeightedGradeAsPercent = (user, period) => {
  const course = getCourseFromPeriod(user.courses, period);
  const courseAssignments = course.assignments;
  if (courseAssignments.length === 0) return "N/A";

  const pointsEarnedPerCategory = [];
  for (const type in sharedConstants.assignmentTypes) {
    pointsEarnedPerCategory.push({
      type,
      atLeastOne: false,
      totalPtsDivided: [],
    });
  }

  let ungradedAssignments = 0;
  courseAssignments.forEach(({ isGraded, pointsEarned, maxPoints, type }) => {
    if (isGraded === false) {
      ungradedAssignments += 1;
      return;
    }

    pointsEarnedPerCategory.some((obj) => {
      if (obj.type === type.name) {
        obj.totalPtsDivided.push(pointsEarned / maxPoints);
        obj.atLeastOne = true;

        return true;
      }
    });
  });

  if (ungradedAssignments === courseAssignments.length) return "N/A";

  let totalPointsWeighted = 0;
  pointsEarnedPerCategory.forEach(({ type, atLeastOne, totalPtsDivided }) => {
    const assigmentWeight = sharedConstants.assignmentTypes[type] / 100;

    if (atLeastOne === false) {
      totalPointsWeighted += 1 * assigmentWeight;
    } else {
      const sum = totalPtsDivided.reduce(
        (accumulator, num) => accumulator + num,
        0,
      );
      totalPointsWeighted += (sum / totalPtsDivided.length) * assigmentWeight;
    }
  });

  return getGradePercentage(totalPointsWeighted);
};

export default getWeightedGradeAsPercent;
