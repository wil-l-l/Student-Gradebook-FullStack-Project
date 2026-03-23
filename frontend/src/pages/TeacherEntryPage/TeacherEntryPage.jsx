import { useContext } from "react";
import "./TeacherEntryPage.css";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import ManageCoursePage from "../../components/ClassStudents/ManageCoursePage";

const TeacherEntryPage = () => {
  const teacher = useContext(UserContext);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <main>
        {selectedCourse ? (
          <ManageCoursePage selectedCourse={selectedCourse} />
        ) : (
          <>
            <h2 className="teacher-entry-page__heading">Classes</h2>
            <ul className="teacher-entry-page__classes-list">
              {teacher.courses.map(({ name, period, students }, index) => (
                <li
                  key={period}
                  className={`teacher-entry-page__classes-list__item${
                    students.length > 0
                      ? " teacher-entry-page__classes-list__item--active"
                      : " teacher-entry-page__classes-list__item--inactive"
                  }`}
                  onClick={() => {
                    if (!(students.length > 0)) return;
                    setSelectedCourse(teacher.courses[index]);
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
