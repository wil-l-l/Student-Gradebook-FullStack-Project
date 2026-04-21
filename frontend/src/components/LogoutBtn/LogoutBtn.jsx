import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./LogoutBtn.css";

const LogoutBtn = ({ classes }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <button
      className={`logout-btn ${classes ? classes : null}`}
      onClick={() => {
        navigate("/");
        setUser(null);
        localStorage.setItem("user", null);
      }}
    >
      LOG OUT
    </button>
  );
};

export default LogoutBtn;
