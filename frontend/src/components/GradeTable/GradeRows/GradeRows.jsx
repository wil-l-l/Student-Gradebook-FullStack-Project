import "./GradeRows.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import getWeightedGradeAsPercent from "../../../utils/getWeightedGradeAsPercent";

const GradeRows = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return user.courses
    .map(({ period, name }) => ({
      period,
      courseInfo: (
        <tr
          key={period}
          className="grade-row"
          onClick={() => navigate(`/student/course/${period}`)}
        >
          <td>{period}</td>
          <td>{name}</td>
          <td>{getWeightedGradeAsPercent(user, period)}</td>
        </tr>
      ),
    }))
    .toSorted((a, b) =>
      a.period > b.period ? 1 : a.period < b.period ? -1 : 0,
    )
    .map(({ courseInfo }) => courseInfo);
};

export default GradeRows;
