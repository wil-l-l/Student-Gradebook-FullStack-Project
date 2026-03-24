import { useContext, useState } from "react";
import "./PublishAssignmentForm.css";
import { UserContext } from "../../contexts/UserContext";

const PublishAssignmentForm = ({ selectedCourse }) => {
  const teacher = useContext(UserContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

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
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <select
        name=""
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
      <button>Submit</button>
    </form>
  );
};

export default PublishAssignmentForm;
