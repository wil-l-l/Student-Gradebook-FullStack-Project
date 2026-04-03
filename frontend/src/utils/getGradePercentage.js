import getRoundedGrade from "./getRoundedGrade";

const getGradePercentage = (grade) =>
  isNaN(grade) ? `0%` : `${getRoundedGrade(grade) * 100}%`;

export default getGradePercentage;
