import "./Reset.css";
import { StudentContext } from "./contexts/StudentContext";
import StudentGradesPage from "./pages/StudentGradesPage/StudentGradesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";
import TeacherEntryPage from "./pages/TeacherEntryPage/TeacherEntryPage";

function App() {
  const [userAccount, setUserAccount] = useState(null);

  return (
    <>
      <StudentContext value={userAccount}>
        {userAccount === null ? (
          <>
            <LoginPage setUserAccount={setUserAccount} />
          </>
        ) : userAccount.isStudent ? (
          <StudentGradesPage />
        ) : (
          <TeacherEntryPage />
        )}
      </StudentContext>
    </>
  );
}

export default App;
