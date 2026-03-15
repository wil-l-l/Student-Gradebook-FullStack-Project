import "./Header.css";
import RequestBtn from "../RequestBtn/RequestBtn";

const Header = ({
  editMode,
  setEditMode,
  studentToView,
  students,
  setStudents,
  setCurrentStudent,
}) => {
  return (
    <header className="header-box">
      <div className="request-btn-box">
        <RequestBtn
          content={"ADD"}
          editMode={editMode}
          setEditMode={setEditMode}
          students={students}
          setStudents={setStudents}
          setCurrentStudent={setCurrentStudent}
        />
        <RequestBtn
          content={"UPD"}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <RequestBtn
          content={"DEL"}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>

      <div className="profile-box">
        <img src="" alt={studentToView.name} className="profile-img" />
        <p className="profile-name">{studentToView.name}</p>
      </div>
    </header>
  );
};

export default Header;
