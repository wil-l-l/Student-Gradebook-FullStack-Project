import { useEffect, useState } from "react";
import "./SchoolSelector.css";

const SchoolSelector = ({ onChange }) => {
  const [schools, setSchools] = useState([]);

  async function getSchools() {
    const schools = await fetch(
      "https://gradebook-backend-pmo7.onrender.com/api/schools",
    );
    const schoolsData = await schools.json();
    return schoolsData.data;
  }

  useEffect(() => {
    getSchools().then((schoolsArr) => setSchools(schoolsArr));
  }, []);

  return (
    <>
      <label htmlFor="school-selector">Select School: </label>
      <select
        className="school-selector"
        required
        name=""
        id="school-selector"
        onChange={onChange}
        defaultValue={""}
      >
        <option value="" disabled hidden></option>
        {schools.length > 0 &&
          schools.map(({ name, code }) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
};

export default SchoolSelector;
