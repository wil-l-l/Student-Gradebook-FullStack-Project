import "./SignUpPage.css";
import SchoolSelector from "../../components/SchoolSelector/SchoolSelector";
import { useState } from "react";

const SignUpPage = () => {
  const defaultInputData = {
    firstName: "",
    lastName: "",
    middleName: "",
    school: "",
  };
  const [inputData, setInputData] = useState(defaultInputData);
  const [createdUser, setCreatedUser] = useState(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify({
            firstName: inputData.firstName,
            lastName: inputData.lastName,
            middleName: inputData.middleName,
            school: inputData.school,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const newUser = await response.json();

        setInputData(defaultInputData);
        setCreatedUser(newUser.data);
      }}
      action=""
    >
      <input
        type="text"
        placeholder="First Name"
        autoComplete="on"
        value={inputData.firstName}
        onChange={(e) =>
          setInputData({ ...inputData, firstName: e.target.value })
        }
      />
      <br />
      <input
        type="text"
        autoComplete="on"
        placeholder="Last Name"
        value={inputData.lastName}
        onChange={(e) =>
          setInputData({ ...inputData, lastName: e.target.value })
        }
      />
      <br />
      <input
        type="text"
        autoComplete="on"
        placeholder="Middle Name"
        value={inputData.middleName}
        onChange={(e) =>
          setInputData({ ...inputData, middleName: e.target.value })
        }
      />
      <br />
      <SchoolSelector
        value={inputData.school}
        onChange={(e) => setInputData({ ...inputData, school: e.target.value })}
      />
      <br />
      <button>Submit</button>

      {createdUser && (
        <>
          <p>
            <span className="green-text">Successfully</span> created new user!
          </p>
          <p>username: {createdUser.userName} </p>
        </>
      )}
    </form>
  );
};

export default SignUpPage;
