import "./SchoolSelector.css";

const SchoolSelector = ({ onChange }) => {
  return (
    <select name="" id="" onChange={onChange} defaultValue={""}>
      <option value="" disabled hidden></option>
      <option value="Vineyards High School">Vineyards High School</option>
      <option value="Titans High School">Titans High School</option>
      <option value="Old Garden High School">Old Garden High School</option>
    </select>
  );
};

export default SchoolSelector;
