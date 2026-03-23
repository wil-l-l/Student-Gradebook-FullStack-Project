import ManageAssignments from "../ManageAssignments/ManageAssignments";
import ManageStudents from "../ManageStudents/ManageStudents";
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
        <ManageStudents selectedCourse={selectedCourse} />
      ) : (
        <ManageAssignments selectedCourse={selectedCourse} />
      )}
    </>
  );
};

export default ManageCoursePage;
