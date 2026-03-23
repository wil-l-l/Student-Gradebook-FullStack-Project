import "./Reset.css";
import { UserContext } from "./contexts/UserContext";
import StudentGradesPage from "./pages/StudentGradesPage/StudentGradesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";
import TeacherEntryPage from "./pages/TeacherEntryPage/TeacherEntryPage";

function App() {
  const [userAccount, setUserAccount] = useState(null);

  return (
    <>
      <UserContext value={userAccount}>
        {userAccount === null ? (
          <>
            <LoginPage setUserAccount={setUserAccount} />
          </>
        ) : userAccount.isStudent ? (
          <StudentGradesPage />
        ) : (
          <TeacherEntryPage />
        )}
      </UserContext>
    </>
  );
}

export default App;
