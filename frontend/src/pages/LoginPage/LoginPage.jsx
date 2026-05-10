import "./LoginPage.css";
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loginResponse, setLoginResponse] = useState(null);

  useEffect(() => {
    if (user === null) return;

    if (user.isStudent) navigate("/student");
    else navigate("/teacher");
  }, [user, navigate]);

  const login = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        userName,
        password,
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
          login();
        }}
      >
        <p className="login-page__form__login-text bold-text">Login</p>
        {loginResponse && loginResponse.success === false && (
          <p className="login-page_error-msg red-text">
            {loginResponse.message}
          </p>
        )}
        <label className="login-page__form__username-label" htmlFor="username">
          username
        </label>
        <input
          type="text"
          placeholder="username"
          minLength={6}
          maxLength={52}
          required
          id="username"
          className="login-page__input-field login-page__username-input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="login-page__form__password-label" htmlFor="password">
          password
        </label>
        <input
          type="password"
          placeholder="password"
          minLength={8}
          maxLength={500}
          required
          autoComplete="true"
          id="password"
          className="login-page__input-field login-page__password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-page__form__submit-btn bold-text"
          type="submit"
        >
          Log in
        </button>
        <Link className="login-page__form__sign-up-link" to={"/signup"}>
          New User? Signup here.
        </Link>
      </form>
    </main>
  );
};

export default LoginPage;
