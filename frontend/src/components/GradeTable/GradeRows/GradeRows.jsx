import "./GradeRows.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const GradeRows = () => {
  const student = useContext(UserContext);

  return student.courses
    .map(({ period, name, grade }) => ({
      period,
      courseInfo: (
        <tr
          key={period}
          className="grade-row"
          onClick={() => {
            console.log(name);
          }}
        >
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
    .toSorted((a, b) =>
      a.period > b.period ? 1 : a.period < b.period ? -1 : 0,
    )
    .map(({ courseInfo }) => courseInfo);
};

export default GradeRows;
