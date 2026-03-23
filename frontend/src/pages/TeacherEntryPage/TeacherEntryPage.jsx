import { useContext } from "react";
import "./TeacherEntryPage.css";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";

const TeacherEntryPage = () => {
  const teacher = useContext(UserContext);
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <>
      <main>
        {selectedClass ? (
          <>
            <h2 className="teacher-entry-page__heading">
              Class Opened: {selectedClass}
            </h2>
            <div
              onClick={(e) => {
                console.log("assignments");
              }}
              className="teacher-entry-page__prompt-block"
            >
              Assignments
            </div>
            <div
              onClick={(e) => {
                console.log("students");
              }}
              className="teacher-entry-page__prompt-block"
            >
              Students
            </div>
          </>
        ) : (
          <>
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
                    setSelectedClass(name);
                  }}
                >
                  {name} {period}
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
};

export default TeacherEntryPage;
