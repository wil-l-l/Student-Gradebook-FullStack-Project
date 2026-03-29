import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const goToLogin = async () => {
      if (user === null) return navigate("/");
    };
    goToLogin();
  }, [user, navigate]);

  return children;
};

export default PrivateRoutes;
