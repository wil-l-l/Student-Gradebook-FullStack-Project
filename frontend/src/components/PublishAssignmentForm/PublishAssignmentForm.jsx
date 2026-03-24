import { useContext, useState } from "react";
import "./PublishAssignmentForm.css";
import { UserContext } from "../../contexts/UserContext";

const PublishAssignmentForm = ({ selectedCourse }) => {
  const teacher = useContext(UserContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [points, setPoints] = useState(5);

  return (
    <form
      action=""
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = {
          name,
          type,
          userName: teacher.userName,
          courseId: selectedCourse._id,
          points: Number(points),
        };
        let response = await fetch("/api/assignments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        response = await response.json();
        console.log(response);
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
