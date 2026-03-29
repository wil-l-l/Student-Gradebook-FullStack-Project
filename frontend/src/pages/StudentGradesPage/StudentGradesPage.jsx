import "./StudentGradesPage.css";
import Header from "../../components/Header/Header";
import MainSection from "../../components/MainSection/MainSection";
import { Outlet, useLocation, useParams } from "react-router";

function StudentGradesPage() {
  const location = useLocation();
  const { period } = useParams();

  return (
    <>
      {location.pathname === "/student" && (
        <>
          <Header />
          <MainSection />
        </>
      )}
      {location.pathname === `/student/course/${period}` && (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}

export default StudentGradesPage;
