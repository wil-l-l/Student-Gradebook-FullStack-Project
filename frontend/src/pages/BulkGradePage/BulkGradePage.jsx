import { useContext, useEffect, useState } from "react";
import "./BulkGradePage.css";
import ReviewBulkGrades from "../../components/ReviewBulkGrades/ReviewBulkGrades";
import PointsForm from "../../components/PointsForm/PointsForm";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";

const BulkGradePage = () => {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [trackGradedStudents, setTrackGradedStudents] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const { user } = useContext(UserContext);
  const { period, id } = useParams();

  useEffect(() => {
    const getAssignment = async () => {
      const response = await fetch(
        `https://gradebook-backend-pmo7.onrender.com/api/assignments/${user.userName}/${id}`,
      );
      const responseBody = await response.json();
      if (responseBody.success) setAssignment(responseBody.data);
    };
    getAssignment();
  }, [id, user.userName]);

  const course = getCourseFromPeriod(user.courses, period);
  const courseStudents = [...course.students];
  const currentStudent = courseStudents[currentStudentIndex];

  const getFullName = (student = currentStudent) =>
    student ? student.firstName + " " + student.lastName : "";

  return (
    <div className="bulk-grade-page">
      {assignment === null ? (
        <p>Loading assignment to grade...</p>
      ) : trackGradedStudents.length !== courseStudents.length ? (
        <>
          <PointsForm
            courseStudents={courseStudents}
            currentStudentIndex={currentStudentIndex}
            trackGradedStudents={trackGradedStudents}
            setTrackGradedStudents={setTrackGradedStudents}
            assignment={assignment}
            getFullName={getFullName}
            setCurrentStudentIndex={setCurrentStudentIndex}
          />
        </>
      ) : (
        <ReviewBulkGrades
          courseStudents={courseStudents}
          currentStudentIndex={currentStudentIndex}
          trackGradedStudents={trackGradedStudents}
          setTrackGradedStudents={setTrackGradedStudents}
          assignment={assignment}
          setCurrentStudentIndex={setCurrentStudentIndex}
          getFullName={getFullName}
        />
      )}
    </div>
  );
};

export default BulkGradePage;
