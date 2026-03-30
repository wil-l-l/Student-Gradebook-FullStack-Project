import "./GradeRows.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import getLetterGrade from "../../../utils/getLetterGrade";
import isGradeEmpty from "../../../utils/isGradeEmpty";

const GradeRows = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return user.courses
    .map(({ period, name, grade }) => ({
      period,
      courseInfo: (
        <tr
          key={period}
          className="grade-row"
          onClick={() => navigate(`/student/course/${period}`)}
        >
          <td>{period}</td>
          <td>{name}</td>
          <td>
            {isGradeEmpty(grade) ? "N/A" : `${grade}% ${getLetterGrade(grade)}`}
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
