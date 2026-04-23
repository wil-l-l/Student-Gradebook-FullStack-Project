import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import ProfileIcon from "../../assets/icons/profile-icon.png";

const Header = () => {
  const { user } = useContext(UserContext);
  const fullName = user.firstName + " " + user.lastName;

  return (
    <header className="header-box">
      <div className="profile-box">
        <div className="profile-img-box">
          <img src={ProfileIcon} alt={fullName} className="profile-img" />
        </div>
        <p className="profile-name">{fullName}</p>
      </div>
      <LogoutBtn />
    </header>
  );
};

export default Header;
