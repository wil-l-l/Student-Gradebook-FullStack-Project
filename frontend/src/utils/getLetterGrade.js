import isGradeEmpty from "./isGradeEmpty";

const getLetterGrade = (grade) => {
  if (isGradeEmpty(grade) || isNaN(grade)) return "NG";
  grade = parseFloat(grade.toFixed(2)) * 100;
  return grade >= 90
    ? "A"
    : grade >= 80
      ? "B"
      : grade >= 70
        ? "C"
        : grade >= 60
          ? "D"
          : "F";
};

export default getLetterGrade;
