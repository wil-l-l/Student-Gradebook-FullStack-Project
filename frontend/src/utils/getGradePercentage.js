import getRoundedGrade from "./getRoundedGrade";

const getGradePercentage = (grade) => `${getRoundedGrade(grade) * 100}%`;

export default getGradePercentage;
