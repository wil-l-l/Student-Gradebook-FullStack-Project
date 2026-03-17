import { useNavigate } from "react-router";
import "./LoginPage.css";
import { useRef } from "react";
import { Link } from "react-router";

const LoginPage = () => {
  const userNameRef = useRef(null);
  const navigate = useNavigate();

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
      navigate("/", { replace: true });
      return;
    }

    navigate("/student");
  };

  return (
    <main>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login(userNameRef.current.value);
        }}
      >
        <input
          type="text"
          placeholder="username"
          className="login-page__username-input"
          ref={userNameRef}
        />
      </form>
      <Link to={"/signup"}>New User? SignUp Here.</Link>
    </main>
  );
};

export default LoginPage;
