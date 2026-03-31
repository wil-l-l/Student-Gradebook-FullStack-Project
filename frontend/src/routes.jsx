import { createBrowserRouter } from "react-router";

import PublicRoutes from "./routes/PublicRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";

import TeacherEntryPage from "./pages/TeacherEntryPage/TeacherEntryPage.jsx";
import ManageCoursePage from "./components/ManageCoursePage/ManageCoursePage.jsx";
import ManageStudents from "./components/ManageStudents/ManageStudents.jsx";
import ManageAssignments from "./components/ManageAssignments/ManageAssignments.jsx";

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
        children: [
          {
            path: "/teacher/course/:period",
            element: <ManageCoursePage />,
          },
          {
            path: "/teacher/course/:period/students",
            element: <ManageStudents />,
          },
          {
            path: "/teacher/course/:period/students/:id",
            element: <ViewCoursePage />,
          },
          {
            path: "/teacher/course/:period/assignments",
            element: <ManageAssignments />,
          },
        ],
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
