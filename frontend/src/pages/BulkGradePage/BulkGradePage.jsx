import { useState } from "react";
import "./BulkGradePage.css";
import ReviewBulkGrades from "../../components/ReviewBulkGrades/ReviewBulkGrades";
import PointsForm from "../../components/PointsForm/PointsForm";

const BulkGradePage = ({ course, assignment }) => {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [trackGradedStudents, setTrackGradedStudents] = useState([]);

  const courseStudents = [...course.students];
  const currentStudent = courseStudents[currentStudentIndex];

  const getFullName = (student = currentStudent) =>
    student ? student.firstName + " " + student.lastName : "";

  return (
    <div className="bulk-grade-page">
      {trackGradedStudents.length !== courseStudents.length ? (
        <>
          <p className="bulk-grade-page__student-name">{getFullName()}</p>
          <PointsForm
            courseStudents={courseStudents}
            currentStudentIndex={currentStudentIndex}
            trackGradedStudents={trackGradedStudents}
            setTrackGradedStudents={setTrackGradedStudents}
            assignment={assignment}
            setCurrentStudentIndex={setCurrentStudentIndex}
          />
        </>
      ) : (
        <ReviewBulkGrades
          trackGradedStudents={trackGradedStudents}
          getFullName={getFullName}
        />
      )}
    </div>
  );
};

export default BulkGradePage;
