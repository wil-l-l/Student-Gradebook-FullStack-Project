import "./ManageCoursePage.css";
import { useState } from "react";

const ManageCoursePage = ({ selectedCourse }) => {
  const [choice, setChoice] = useState(null);

  return (
    <>
      {choice === null ? (
        <>
          <h2 className="teacher-entry-page__heading">
            Class Opened: {selectedCourse.name}
          </h2>
          <div
            onClick={() => {
              setChoice("assignments");
            }}
            className="teacher-entry-page__prompt-block"
          >
            Assignments
          </div>
          <div
            onClick={() => {
              setChoice("students");
            }}
            className="teacher-entry-page__prompt-block"
          >
            Students
          </div>
        </>
      ) : choice === "students" ? (
        <>
          <ul>
            {selectedCourse.students.map(
              ({ firstName, lastName, grade }, index) => (
                <li key={firstName + lastName + grade + index}>
                  {firstName}, {lastName} <br />
                  Grade: {grade}
                </li>
              ),
            )}
          </ul>
        </>
      ) : (
        <>
          {selectedCourse.assignments.length > 0 ? (
            <ul>Render assignments list</ul>
          ) : (
            <p>Publish an assignment to get started! </p>
          )}
        </>
      )}
    </>
  );
};

export default ManageCoursePage;
