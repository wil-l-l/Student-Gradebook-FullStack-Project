import "./Header.css";
import { useContext } from "react";
import { StudentContext } from "../../contexts/StudentContext";

const Header = () => {
  const student = useContext(StudentContext);
  const fullName = student.firstName + " " + student.lastName;

  return (
    <header className="header-box">
      <div className="profile-box">
        <img src="" alt={fullName} className="profile-img" />
        <p className="profile-name">{fullName}</p>
      </div>
    </header>
  );
};

export default Header;
