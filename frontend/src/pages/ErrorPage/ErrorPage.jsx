import { useNavigate } from "react-router";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="error-page">
      <p>Ruh-roh, Raggy!</p>
      <p>Can't find the page you're looking for.</p>
      <p>Go back to home</p>
      <button className="error-page__home-btn" onClick={() => navigate("/")}>
        HOME
      </button>
    </section>
  );
};

export default ErrorPage;
