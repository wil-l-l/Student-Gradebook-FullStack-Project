import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import StudentGradePages from "./pages/StudentGradesPage/StudentGradesPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import "./Reset.css";
import "./index.css";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/student",
    element: <StudentGradePages />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
