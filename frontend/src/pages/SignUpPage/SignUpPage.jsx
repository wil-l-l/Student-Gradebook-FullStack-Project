import "./SignUpPage.css";
import SchoolSelector from "../../components/SchoolSelector/SchoolSelector";
import { useState } from "react";

const SignUpPage = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    school: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
    </form>
  );
};

export default SignUpPage;
