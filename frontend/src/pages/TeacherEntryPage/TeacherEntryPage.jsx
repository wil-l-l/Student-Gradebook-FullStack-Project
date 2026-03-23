import { useContext } from "react";
import "./TeacherEntryPage.css";
import { UserContext } from "../../contexts/UserContext";

const TeacherEntryPage = () => {
  const teacher = useContext(UserContext);

  return (
    <>
      <main>
        <h2 className="teacher-entry-page__heading">Classes</h2>
        <ul className="teacher-entry-page__classes-list">
          {teacher.courses.map(({ name, period, students }) => (
            <li
              key={period}
              className={`teacher-entry-page__classes-list__item${
                students.length > 0
                  ? " teacher-entry-page__classes-list__item--active"
                  : " teacher-entry-page__classes-list__item--inactive"
              }`}
              onClick={(e) => {
                if (!(students.length > 0)) return;
                console.log(`Clicked on ${name} class block`);
              }}
            >
              {name} {period}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default TeacherEntryPage;
