import { useContext } from "react";
import "./TeacherEntryPage.css";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate, useParams, Outlet } from "react-router";

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
            <>
              <h2 className="teacher-entry-page__heading">Classes</h2>
              <ul className="teacher-entry-page__classes-list">
                {user.courses.map(({ name, period, students }, index) => (
                  <li
                    key={period}
                    className={`teacher-entry-page__classes-list__item${
                      students.length > 0
                        ? " teacher-entry-page__classes-list__item--active"
                        : " teacher-entry-page__classes-list__item--inactive"
                    }`}
                    onClick={() => {
                      if (!(students.length > 0)) return;
                      navigate(`/teacher/course/${user.courses[index].period}`);
                    }}
                  >
                    {name} {period}
                  </li>
                ))}
              </ul>
            </>
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
    </>
  );
};

export default TeacherEntryPage;
