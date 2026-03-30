import "./GradeRows.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import getCourseFromPeriod from "../../../utils/getCourseFromPeriod";
import sharedConstants from "../../../../../sharedConstants";
import getRoundedGrade from "../../../utils/getRoundedGrade";
import getGradePercentage from "../../../utils/getGradePercentage";

const GradeRows = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getWeightedGradeAsPercent = (period) => {
    const course = getCourseFromPeriod(user.courses, period);
    const courseAssignments = course.assignments;
    if (courseAssignments.length === 0) return "N/A";

    let ungradedAssignments = 0;
    const weightedGradeAsDecimal = courseAssignments.reduce(
      (accumulator, { isGraded, pointsEarned, maxPoints, type }) => {
        if (isGraded === false) {
          ungradedAssignments += 1;
          return accumulator;
        }

        const assigmentWeight =
          sharedConstants.assignmentTypes[type.name] / 100;

        return (
          accumulator +
          getRoundedGrade(pointsEarned / maxPoints) * assigmentWeight
        );
      },
      0,
    );

    return ungradedAssignments === courseAssignments.length
      ? "N/A"
      : getGradePercentage(weightedGradeAsDecimal);
  };

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
          <td>{getWeightedGradeAsPercent(period)}</td>
        </tr>
      ),
    }))
    .toSorted((a, b) =>
      a.period > b.period ? 1 : a.period < b.period ? -1 : 0,
    )
    .map(({ courseInfo }) => courseInfo);
};

export default GradeRows;
