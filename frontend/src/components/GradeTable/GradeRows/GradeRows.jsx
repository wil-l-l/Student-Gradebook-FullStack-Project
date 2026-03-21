import "./GradeRows.css";
import { useContext } from "react";
import { StudentContext } from "../../../contexts/StudentContext";

const GradeRows = () => {
  const student = useContext(StudentContext);

  return student.courses
    .map(({ period, name, grade }) => ({
      period,
      courseInfo: (
        <tr key={period} className="grade-row">
          <td>{period}</td>
          <td>{name}</td>
          <td>
            {!grade
              ? "NG"
              : `${grade}% ${
                  grade >= 90
                    ? "A"
                    : grade >= 80
                      ? "B"
                      : grade >= 70
                        ? "C"
                        : grade >= 60
                          ? "D"
                          : "F"
                }`}
          </td>
        </tr>
      ),
    }))
    .toSorted((a, b) => (a.pd > b.pd ? 1 : a.pd < b.pd ? -1 : 0))
    .map(({ courseInfo }) => courseInfo);
};

export default GradeRows;
