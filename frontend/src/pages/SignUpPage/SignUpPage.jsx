import "./SignUpPage.css";
import SchoolSelector from "../../components/SchoolSelector/SchoolSelector";
import { useState } from "react";
import { Link } from "react-router";

const SignUpPage = () => {
  const defaultInputData = {
    firstName: "",
    lastName: "",
    middleName: "",
    school: "",
  };
  const [inputData, setInputData] = useState(defaultInputData);
  const [signUpResponse, setSignUpResponse] = useState(null);

  return (
    <form
      onSubmit={async (e) => {
        const requiredUserData = {
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          school: inputData.school,
        };

        if (inputData.middleName)
          requiredUserData.middleName = inputData.middleName;

        e.preventDefault();
        const response = await fetch(
          "https://gradebook-backend-pmo7.onrender.com/api/signup",
          {
            method: "POST",
            body: JSON.stringify(requiredUserData),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const responseBody = await response.json();

        setInputData({ ...defaultInputData, school: requiredUserData.school });
        setSignUpResponse(responseBody);
      }}
      action=""
      className="signup-page__form"
    >
      <p className="signup-page__signup-text bold-text">Signup</p>
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        placeholder="First Name"
        autoComplete="on"
        minLength={3}
        maxLength={50}
        required
        value={inputData.firstName}
        onChange={(e) =>
          setInputData({ ...inputData, firstName: e.target.value })
        }
        className="signup-page__text-input"
        id="first-name"
      />
      <br />
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        autoComplete="on"
        placeholder="Last Name"
        minLength={3}
        maxLength={50}
        required
        value={inputData.lastName}
        onChange={(e) =>
          setInputData({ ...inputData, lastName: e.target.value })
        }
        className="signup-page__text-input"
        id="last-name"
      />
      <br />
      <label htmlFor="middle-name">Middle Name:</label>
      <input
        type="text"
        autoComplete="on"
        placeholder="Middle Name"
        value={inputData.middleName}
        minLength={3}
        maxLength={50}
        onChange={(e) =>
          setInputData({ ...inputData, middleName: e.target.value })
        }
        className="signup-page__text-input"
        id="middle-name"
      />
      <br />
      <SchoolSelector
        value={inputData.school}
        onChange={(e) => setInputData({ ...inputData, school: e.target.value })}
      />
      <br />
      <button className="signup-page__submit-btn">Submit</button>

      {signUpResponse &&
        (signUpResponse.success ? (
          <>
            <p>
              <span className="green-text">Successfully</span> created new user!
            </p>
            <p>username: {signUpResponse.data.userName} </p>
            <Link to="/">Go back to main page here!</Link>
          </>
        ) : (
          <>
            <p className="error-text">Could not create a new user.</p>
            <p className="error-text">Error: {signUpResponse.message} </p>
            <p>Please try again!</p>
          </>
        ))}
    </form>
  );
};

export default SignUpPage;
