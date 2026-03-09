import "./GradeRows.css";
import { useEffect, useRef, useState } from "react";
import fetchStudents from "../../../utils/fetchStudents";

const GradeRows = ({
  studentToView,
  currentStudent,
  editMode,
  students,
  setStudents,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const [cellToEdit, setCellToEdit] = useState(null);
  const [newStudentInfo, setNewStudentInfo] = useState(null);
  const [deleteClicks, setDeleteClicks] = useState(0);
  const inputRef = useRef(null);
  const TABLE_CELL_CLASS = "grade-row__cell";
  const deleteClicksThreshold = 3;
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (newStudentInfo) {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      fetchStudents(
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudentInfo),
        },
        "/" + currentStudent,
        abortControllerRef.current,
      ).then((result) => {
        const newStudents = [...students];
        newStudents[currentStudent - 1] = result;
        setStudents(newStudents);
      });
    }

    return () => {
      setActiveRow(null);
      setNewStudentInfo(null);
    };
  }, [currentStudent, editMode, newStudentInfo, students, setStudents]);

  function canEditCell(location) {
    return (
      editMode === "UPD" &&
      cellToEdit !== null &&
      cellToEdit.location === location
    );
  }

  const closeActiveCell = () => {
    inputRef.current.blur();
    setCellToEdit(null);
    inputRef.current = null;
  };

  const onDeletedRow = () => {
    setDeleteClicks(0);
    setActiveRow(null);
  };

  function handleRowClick(rowClicked) {
    if (editMode !== "DEL") return;
    if (activeRow === rowClicked) {
      const currentClicks = deleteClicks + 1;
      setDeleteClicks(currentClicks);
      if (currentClicks === deleteClicksThreshold) {
        const newStudentInfo = { ...studentToView };
        const updatedCourses = [];
        studentToView.courses.forEach((studentObj) => {
          if (studentObj.pd !== rowClicked) updatedCourses.push(studentObj);
        });
        newStudentInfo.courses = updatedCourses;

        setNewStudentInfo(newStudentInfo);
        onDeletedRow();
      }
      return;
    }

    setActiveRow(rowClicked);
    setDeleteClicks(1);
  }

  function handleCellClick(cell, rowPeriod) {
    if (editMode !== "UPD") return;

    const location = cell.getAttribute("location");
    if (cellToEdit && cellToEdit.location === location) return; // Last condition means the same cell that has already been edited was clicked again (just in case)
    if (cellToEdit && location === null) return; // The value of 'cell' parameter is a NESTED input element whose ancestor is a 'td' element. The HTML chain looks like this: td > form > input (the cell). The input element has no 'location' attribute and that also means this cell that was just clicked is the same cell currently being edited anyway (so don't run the rest of this function)

    const cellType = location[2] === "2" ? "course" : "grade"; // location[2] = the col the cell is in the table

    setCellToEdit({
      location,
      content: (
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const newStudentInfo = studentToView.courses.map(
              ({ name, pd, grade }) => {
                if (rowPeriod === pd) {
                  if (cellType === "course") {
                    name = inputRef.current.value;
                  } else {
                    grade = inputRef.current.value;
                  }
                }
                return {
                  name,
                  pd,
                  grade,
                };
              },
            );

            setNewStudentInfo({ ...studentToView, courses: newStudentInfo });

            closeActiveCell();
          }}
        >
          <input
            className={`${editMode === "UPD" ? "cell-input-box" : TABLE_CELL_CLASS}`}
            type={`${cellType === "course" ? "text" : "number"}`}
            min={0}
            max={100}
            ref={inputRef}
            autoFocus
            placeholder={`${cellType === "course" ? "Course..." : "Grade..."}`}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeActiveCell();
            }}
          />
        </form>
      ),
    });
  }

  return studentToView.courses
    .map(({ pd, name, grade }, row) => ({
      pd,
      courseInfo: (
        <tr
          key={pd}
          onClick={() => handleRowClick(pd)}
          className={`grade-row ${editMode === "DEL" && pd === activeRow ? `${deleteClicks === 1 ? "delete-row" : "delete-row-confirm"}` : ""}`}
        >
          <td location={`${row},1`} className={`${TABLE_CELL_CLASS}`}>
            {pd}
          </td>
          <td
            location={`${row},2`}
            onClick={(e) => handleCellClick(e.target, pd)}
            className={`${TABLE_CELL_CLASS}`}
          >
            {canEditCell(`${row},2`) ? cellToEdit.content : name}
          </td>
          <td
            location={`${row},3`}
            onClick={(e) => handleCellClick(e.target, pd)}
            className={`${TABLE_CELL_CLASS}`}
          >
            {canEditCell(`${row},3`)
              ? cellToEdit.content
              : !grade
                ? "NG"
                : `${grade}% ${
                    grade >= 90
                      ? "A"
                      : grade >= 80
                        ? "B"
                        : grade >= 70
                          ? "C"
                          : grade >= 60
                            ? "D"
                            : "F"
                  }`}
          </td>
        </tr>
      ),
    }))
    .toSorted((a, b) => (a.pd > b.pd ? 1 : a.pd < b.pd ? -1 : 0))
    .map(({ courseInfo }) => courseInfo);
};

export default GradeRows;
