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
      ptsEarned: 0,
      totalPts: 0,
      weight: sharedConstants.assignmentTypes[type] / 100,
    });
  }

  const getCategory = (category) =>
    pointsEarnedPerCategory.find(({ type }) => category === type);

  courseAssignments.forEach((assignment) => {
    const categoryObj = getCategory(assignment.type.name);
    categoryObj.totalPts += assignment.maxPoints;
    categoryObj.ptsEarned += assignment.pointsEarned;
  });

  let finalPointsEarnedWeighted = 0;
  let combinedWeight = 0;
  pointsEarnedPerCategory.forEach((obj) => {
    if (obj.totalPts === 0) return;
    combinedWeight += obj.weight;
    finalPointsEarnedWeighted += (obj.ptsEarned / obj.totalPts) * obj.weight;
  });

  const finalPointsWeighted = finalPointsEarnedWeighted / combinedWeight;

  return getGradePercentage(finalPointsWeighted);
};

export default getWeightedGradeAsPercent;
