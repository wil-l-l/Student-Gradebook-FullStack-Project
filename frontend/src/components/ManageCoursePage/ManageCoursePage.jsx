import { useLocation, useNavigate, useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./ManageCoursePage.css";
import PageCard from "../PageCard/PageCard";

const ManageCoursePage = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();
  const course = getCourseFromPeriod(user.courses, period);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getNavigateHandler = (endpoint) => {
    navigate(`/teacher/course/${period}/${endpoint}`);
  };

  return (
    <>
      {pathname === `${pathname}` && (
        <>
          <PageCard
            headingBoxChildren={<h2>Viewing: {course.name}</h2>}
            list={[
              {
                key: "assignments",
                children: `Assignments`,
                onClickHandler: () => getNavigateHandler("assignments"),
              },
              {
                key: "students",
                children: `Students`,
                onClickHandler: () => getNavigateHandler("students"),
              },
            ]}
          />
        </>
      )}
    </>
  );
};

export default ManageCoursePage;
