import "./LoginPage.css";
import { useRef, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const userNameRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loginResponse, setLoginResponse] = useState(null);

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
    setLoginResponse(responseBody);

    if (!responseBody.success) return;

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
        {loginResponse && loginResponse.success === false && (
          <p className="login-page_error-msg red-text">
            {loginResponse.message}
          </p>
        )}
        <input
          type="text"
          placeholder="username"
          minLength={6}
          maxLength={52}
          required
          className="login-page__username-input"
          ref={userNameRef}
        />
      </form>
      <Link to={"/signup"}>New User? Signup here.</Link>
    </main>
  );
};

export default LoginPage;
