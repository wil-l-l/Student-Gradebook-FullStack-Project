import { useContext } from "react";
import "./TeacherEntryPage.css";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate, useParams, Outlet } from "react-router";
import PageCard from "../../components/PageCard/PageCard";

const TeacherEntryPage = () => {
  const { user } = useContext(UserContext);
  const { period, id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {pathname === "/teacher" && (
        <>
          <main>
            <PageCard
              headingBoxChildren={<h2>Classes</h2>}
              list={user.courses.map(({ name, period, students }, index) => ({
                key: period,
                children: (
                  <>
                    <p>{name}</p>
                    <p>Pd: {period}</p>
                  </>
                ),
                onClickHandler: () => {
                  if (!(students.length > 0)) return;
                  navigate(`/teacher/course/${user.courses[index].period}`);
                },
              }))}
            />
          </main>
        </>
      )}
      {pathname === `/teacher/course/${period}` && <Outlet />}
      {pathname === `/teacher/course/${period}/students` && <Outlet />}
      {pathname === `/teacher/course/${period}/assignments` && <Outlet />}
      {pathname === `/teacher/course/${period}/students/${id}` && <Outlet />}
      {pathname === `/teacher/course/${period}/assignments/publish` && (
        <Outlet />
      )}
      {pathname ===
        `/teacher/course/${period}/assignments/bulk-grade/${id}` && <Outlet />}
    </>
  );
};

export default TeacherEntryPage;
