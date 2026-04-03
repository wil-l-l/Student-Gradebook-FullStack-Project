import { useContext, useEffect, useState } from "react";
import "./PublishAssignmentForm.css";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
import getCourseFromPeriod from "../../utils/getCourseFromPeriod";

const PublishAssignmentForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [points, setPoints] = useState(5);
  const { period } = useParams();
  const [didPublish, setdidPublish] = useState(false);

  const course = getCourseFromPeriod(user.courses, period);

  const clearFormFields = () => {
    setName("");
    setType("");
    setPoints(5);
  };

  useEffect(() => {
    if (didPublish) {
      const fetchAssignments = async () => {
        const response = await fetch(`/api/users/${user._id}`);
        const responseBody = await response.json();

        const updatedTeacher = responseBody.data;
        setUser(updatedTeacher);
        setdidPublish(false);
      };
      fetchAssignments();
    }
  }, [period, setUser, user._id, didPublish]);

  return (
    <form
      action=""
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = {
          name,
          type,
          userName: user.userName,
          courseId: course._id,
          maxPoints: Number(points),
        };
        let response = await fetch("/api/assignments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        response = await response.json();
        if (response.success) {
          clearFormFields();
          setdidPublish(true);
        }
      }}
    >
      <label htmlFor="assignment-name">Assignment Name: </label>
      <input
        type="text"
        placeholder="name"
        name="assignment-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="assignment-type-selector">Assignment Type: </label>
      <select
        name="assignment-type-selector"
        id=""
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value=""></option>
        <option value="classwork">classwork</option>
        <option value="homework">homework</option>
        <option value="assessments">assessments</option>
      </select>
      <br />
      <label htmlFor="assignment-points">Points: </label>
      <input
        type="number"
        name="assignment-points"
        id=""
        min={5}
        max={100}
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default PublishAssignmentForm;
