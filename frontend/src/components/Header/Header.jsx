import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

const Header = () => {
  const { user } = useContext(UserContext);
  const fullName = user.firstName + " " + user.lastName;

  return (
    <header className="header-box">
      <div className="profile-box">
        <img src="" alt={fullName} className="profile-img" />
        <p className="profile-name">{fullName}</p>
      </div>
      <LogoutBtn />
    </header>
  );
};

export default Header;
