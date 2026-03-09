import "./RequestBtn.css";
import UpdateIcon from "../../assets/icons/edit-pen-icon.png";
import AddIcon from "../../assets/icons/plus-icon.png";
import DeleteIcon from "../../assets/icons/trash-can-black-icon.png";
import { useRef, useState } from "react";
import fetchStudents from "../../utils/fetchStudents";

const RequestBtn = ({
  content,
  editMode,
  setEditMode,
  students,
  setStudents,
  setCurrentStudent = null,
}) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const abortControllerRef = useRef(null);
  const requestIcons = {
    ADD: AddIcon,
    UPD: UpdateIcon,
    DEL: DeleteIcon,
  };

  function onAddButtonClick() {
    const cleanUp = () => {
      setEditMode(null);
      setCurrentStudent(4);
    };

    if (students.length === 4) {
      cleanUp();
      return;
    }
    const presetData = {
      id: "4",
      name: "Bri Stewart",
      grade_level: 11,
      courses: [
        {
          name: "Geography",
          pd: 5,
          grade: 80,
        },
        {
          name: "Science",
          pd: 2,
          grade: 88,
        },
        {
          name: "Math",
          pd: 3,
          grade: 96,
        },
        {
          name: "Music",
          pd: 4,
          grade: 97,
        },
        {
          name: "Art",
          pd: 6,
          grade: 100,
        },
        {
          name: "English",
          pd: 1,
          grade: 95,
        },
      ],
    };
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    fetchStudents({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(presetData),
    }, "", abortControllerRef.current).then((result) => {
      setStudents([...students, result]);
      cleanUp();
    });
  }

  return (
    <button
      onClick={() => {
        setEditMode(
          editMode === null && requestIcons[content]
            ? content
            : content !== editMode
              ? editMode
              : null,
        );
        if (content !== "ADD") return;
        if (isAddMode) {
          setIsAddMode(false);
          setEditMode(null);
        } else {
          setIsAddMode(true);
          onAddButtonClick();
        }
      }}
      className={`request-btn ${editMode === content ? "request-btn--active" : "request-btn--inactive"}`}
    >
      <img
        src={requestIcons[content]}
        alt={content}
        className="request-btn__img"
        width={512}
        height={512}
      />
    </button>
  );
};

export default RequestBtn;
