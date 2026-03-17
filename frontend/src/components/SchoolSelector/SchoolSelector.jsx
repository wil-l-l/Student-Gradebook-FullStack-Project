import { useEffect, useState } from "react";
import "./SchoolSelector.css";

const SchoolSelector = ({ onChange }) => {
  const [schools, setSchools] = useState([]);

  async function getSchools() {
    const schools = await fetch("/api/schools");
    const schoolsData = await schools.json();
    return schoolsData.data;
  }

  useEffect(() => {
    getSchools().then((schoolsArr) => setSchools(schoolsArr));
  }, []);

  return (
    <select name="" id="" onChange={onChange} defaultValue={""}>
      <option value="" disabled hidden></option>
      {schools.length > 0 &&
        schools.map(({ name, code }) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
    </select>
  );
};

export default SchoolSelector;
