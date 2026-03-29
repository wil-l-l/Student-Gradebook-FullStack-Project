import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./Reset.css";
import "./index.css";

import { UserProvider } from "./contexts/UserContext.jsx";
import PublicRoutes from "./routes/PublicRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import TeacherEntryPage from "./pages/TeacherEntryPage/TeacherEntryPage.jsx";
import StudentGradesPage from "./pages/StudentGradesPage/StudentGradesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoutes>
        <LoginPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoutes>
        <SignUpPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/teacher",
    element: (
      <PrivateRoutes>
        <TeacherEntryPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/student",
    element: (
      <PrivateRoutes>
        <StudentGradesPage />
      </PrivateRoutes>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
);
