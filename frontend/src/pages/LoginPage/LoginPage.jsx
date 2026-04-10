import "./LoginPage.css";
import { useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) return;

    if (user.isStudent) navigate("/student");
    else navigate("/teacher");
  }, [user, navigate]);

  const login = async (userName) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        userName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();

    if (!responseBody.success) {
      console.error(responseBody.message);
      return;
    }

    setUser(responseBody.data);
  };

  return (
    <main>
      <form
        className="login-page__form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login(userNameRef.current.value);
        }}
      >
        <div className="login-page__form__user-img"></div>
        <input
          type="text"
          placeholder="username"
          className="login-page__username-input"
          ref={userNameRef}
        />
      </form>
      <Link to={"/signup"}>New User? Signup here.</Link>
    </main>
  );
};

export default LoginPage;
