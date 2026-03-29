import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const goToLogin = async () => {
      if (user === null) return navigate("/");
    };
    goToLogin();
  }, [user, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;
