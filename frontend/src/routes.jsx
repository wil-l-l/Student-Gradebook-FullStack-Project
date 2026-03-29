import { createBrowserRouter } from "react-router";

import PublicRoutes from "./routes/PublicRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";

import TeacherEntryPage from "./pages/TeacherEntryPage/TeacherEntryPage.jsx";

import StudentGradesPage from "./pages/StudentGradesPage/StudentGradesPage.jsx";
import ViewCoursePage from "./pages/ViewCoursePage/ViewCoursePage.jsx";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/teacher",
        element: <TeacherEntryPage />,
      },
      {
        path: "/student",
        element: <StudentGradesPage />,
        children: [
          {
            path: "/student/course/:period",
            element: <ViewCoursePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
