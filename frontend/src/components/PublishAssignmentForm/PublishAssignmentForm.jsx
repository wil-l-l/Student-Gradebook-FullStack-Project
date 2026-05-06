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
  const [didPublish, setdidPublish] = useState(null);

  const course = getCourseFromPeriod(user.courses, period);

  const clearFormFields = () => {
    setName("");
    setType("");
    setPoints(5);
  };

  useEffect(() => {
    if (didPublish) {
      const fetchAssignments = async () => {
        const response = await fetch(
          `https://gradebook-backend-pmo7.onrender.com/api/users/${user._id}`,
        );
        const responseBody = await response.json();

        const updatedTeacher = responseBody.data;
        setUser(updatedTeacher);
      };
      fetchAssignments();
    }
  }, [period, setUser, user._id, didPublish]);

  return (
    <form
      className="publish-assignment-form"
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
        let response = await fetch(
          "https://gradebook-backend-pmo7.onrender.com/api/assignments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
        response = await response.json();
        if (response.success) {
          clearFormFields();
          setdidPublish(true);
        } else setdidPublish(false);
      }}
    >
      <p className="publish-assignment-form__heading bold-text">
        Publish Assignments
      </p>
      <label htmlFor="assignment-name">Assignment Name: </label>
      <input
        className="publish-assignment-form__input"
        type="text"
        placeholder="name"
        name="assignment-name"
        value={name}
        minLength={3}
        maxLength={80}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="assignment-type-selector">Assignment Type: </label>
      <select
        className="publish-assignment-form__input"
        name="assignment-type-selector"
        id=""
        value={type}
        required
        onChange={(e) => setType(e.target.value)}
      >
        <option
          value="select assignment type"
          className="publish-assignment-form__assignment-type-input"
          disabled
        >
          select assignment type
        </option>
        <option value="classwork">classwork</option>
        <option value="homework">homework</option>
        <option value="assessments">assessments</option>
      </select>
      <br />
      <label htmlFor="assignment-points">Points: </label>
      <input
        className="publish-assignment-form__input"
        type="number"
        name="assignment-points"
        id=""
        min={5}
        max={100}
        value={points}
        required
        onChange={(e) => setPoints(e.target.value)}
      />
      <br />
      <button className="publish-assignment-form__submit-btn">SUBMIT</button>
      {didPublish && (
        <p className="green-text">Successfully created assignment!</p>
      )}
      {didPublish === false && (
        <>
          <p className="red-text">Could not create an assignment.</p>
          <p>Please try again!</p>
        </>
      )}
    </form>
  );
};

export default PublishAssignmentForm;
