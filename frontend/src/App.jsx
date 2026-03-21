import "./Reset.css";
import { StudentContext } from "./contexts/StudentContext";
import StudentGradesPage from "./pages/StudentGradesPage/StudentGradesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

function App() {
  const [studentAccount, setStudentAccount] = useState(null);

  return (
    <>
      <StudentContext value={studentAccount}>
        {studentAccount === null ? (
          <>
            <LoginPage setStudentAccount={setStudentAccount} />
          </>
        ) : (
          <StudentGradesPage />
        )}
      </StudentContext>
    </>
  );
}

export default App;
