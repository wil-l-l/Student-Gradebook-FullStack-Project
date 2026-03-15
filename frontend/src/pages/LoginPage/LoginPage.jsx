import "./LoginPage.css";
import { useRef } from "react";

const LoginPage = () => {
  const inputRef = useRef(null);

  return (
    <main>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputRef.current.value);
          // Verify login...

          // Open normal app page...
        }}
      >
        <input
          type="text"
          placeholder="username"
          className="login-page__username-input"
          ref={inputRef}
        />
      </form>
    </main>
  );
};

export default LoginPage;
