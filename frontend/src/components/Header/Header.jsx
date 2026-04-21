import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const fullName = user.firstName + " " + user.lastName;
  const navigate = useNavigate();

  return (
    <header className="header-box">
      <div className="profile-box">
        <img src="" alt={fullName} className="profile-img" />
        <p className="profile-name">{fullName}</p>
      </div>
      <button
        className="student-entry-page__logout-btn"
        onClick={() => {
          setUser(null);
          localStorage.setItem("user", null);
          navigate("/");
        }}
      >
        LOG OUT
      </button>
    </header>
  );
};

export default Header;
