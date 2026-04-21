import { useNavigate, useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./ManageStudents.css";
import getWeightedGradeAsPercent from "../../utils/getWeightedGradeAsPercent";
import PageCard from "../PageCard/PageCard";

const ManageStudents = () => {
  const { user } = useContext(UserContext);
  const { period } = useParams();
  const course = getCourseFromPeriod(user.courses, period);
  const navigate = useNavigate();
  const [loadedStudents, setLoadedStudents] = useState([]);
  const [loadedAllStudents, setLoadedAllStudents] = useState(null);

  const isStudent = user.isStudent;
  useEffect(() => {
    const storeLoadedStudents = [];
    const getStudent = async (id) => {
      let response = await fetch(`/api/users/${id}`);
      response = await response.json();
      const student = response.data;

      storeLoadedStudents.push(student);

      if (storeLoadedStudents.length === course.students.length) {
        setLoadedStudents(storeLoadedStudents);
        setLoadedAllStudents(true);
      }
    };

    course.students.forEach(({ _id }) => getStudent(_id));
  }, [isStudent, setLoadedStudents, user, period, course.students]);

  return (
    <PageCard
      headingBoxChildren={<h2>Course Students</h2>}
      list={course.students.map(({ firstName, lastName, _id }, index) => ({
        key: firstName + lastName + index,
        children: (
          <>
            <p>
              {firstName}, {lastName}
            </p>
            <p>
              Grade:{" "}
              {loadedAllStudents
                ? getWeightedGradeAsPercent(
                    loadedStudents.find((studentObj) => studentObj._id === _id),
                    period,
                  )
                : "Loading..."}
            </p>
          </>
        ),
        onClickHandler: () =>
          navigate(`/teacher/course/${period}/students/${_id}`),
        customClasses: "manage-students__list-item",
      }))}
    />
  );
};

export default ManageStudents;
