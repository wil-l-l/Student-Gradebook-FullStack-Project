import getCourseFromPeriod from "./getCourseFromPeriod";
import sharedConstants from "../sharedConstants";
import getGradePercentage from "./getGradePercentage";

const getWeightedGradeAsPercent = (user, period, courseAssignments = null) => {
  if (courseAssignments === null) {
    const course = getCourseFromPeriod(user.courses, period);
    courseAssignments = course.assignments;
  }
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

  let countGradedCategories = 0;
  pointsEarnedPerCategory.forEach(({ atLeastOne }) => {
    if (atLeastOne) countGradedCategories += 1;
  });

  let totalPointsWeighted = 0;
  pointsEarnedPerCategory.forEach(({ type, atLeastOne, totalPtsDivided }) => {
    if (atLeastOne === false) return;

    const assigmentWeight = sharedConstants.assignmentTypes[type] / 100;

    const sum = totalPtsDivided.reduce(
      (accumulator, num) => accumulator + num,
      0,
    );
    const avgPtsEarned =
      totalPtsDivided.length === 0 ? 0 : sum / totalPtsDivided.length;

    totalPointsWeighted += avgPtsEarned * assigmentWeight;
  });

  const forNoAssignmentCategories =
    countGradedCategories === 1 ? 3 : countGradedCategories === 2 ? 2 : 1;

  totalPointsWeighted = forNoAssignmentCategories * totalPointsWeighted;

  return getGradePercentage(totalPointsWeighted);
};

export default getWeightedGradeAsPercent;
