import getRoundedGrade from "./getRoundedGrade";

const getGradePercentage = (grade) =>
  isNaN(grade) ? `0%` : `${(getRoundedGrade(grade) * 100).toFixed()}%`;

export default getGradePercentage;
