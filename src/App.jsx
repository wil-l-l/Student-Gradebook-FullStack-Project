import "./Reset.css";
import "./App.css";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import { useState, useEffect, useRef } from "react";
import fetchStudents from "./utils/fetchStudents";
import { Link } from "react-router";

function App() {
  const [students, setStudents] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(2);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    fetchStudents({}, "", abortControllerRef.current).then(
      (result) => {
        setStudents(result);
      },
      (reason) => {
        setError(
          "Couldn't load students data. Please refresh the page! " + reason,
        );
      },
    );
  }, []);

  return (
    <>
      {!students && !error ? (
        <>
          <h1>Loading...</h1>
          <Link
            target="_blank"
            className="server-link"
            to={"https://grades-server-2.onrender.com/"}
          >
            Make sure to open this link in a new tab if you haven't already!
          </Link>
        </>
      ) : !students && error ? (
        <h1 className="error-text">{error}</h1>
      ) : (
        <>
          <Header
            editMode={editMode}
            setEditMode={setEditMode}
            studentToView={students[currentStudent - 1]}
            students={students}
            setStudents={setStudents}
            setCurrentStudent={setCurrentStudent}
          />

          <MainSection
            students={students}
            setStudents={setStudents}
            studentToView={students[currentStudent - 1]}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </>
      )}
    </>
  );
}

export default App;
