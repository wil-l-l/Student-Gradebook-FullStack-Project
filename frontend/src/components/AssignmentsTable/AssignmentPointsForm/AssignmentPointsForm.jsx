import "./AssignmentPointsForm.css";
import getGradePercentage from "../../../utils/getGradePercentage";
import getLetterGrade from "../../../utils/getLetterGrade";

const AssignmentPointsForm = ({
  assignments,
  updatedAssignmentsState,
  cellClickedState,
  newPointsEarnedState,
  pointsFormRef,
  maxPoints,
  studentId,
  teacherUserName,
}) => {
  const clearPointsInput = () => {
    cellClickedState.set(null);
    newPointsEarnedState.set(0);
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        const pointsEarnedToSubmit = Number(pointsFormRef.current.value);

        const assignmentToUpdate = assignments[cellClickedState.state];
        const assignmentId = assignmentToUpdate._id;

        const updateAssignmentGrade = async () => {
          let updateResponse = await fetch(`/api/assignments/${assignmentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentId,
              pointsEarned: pointsEarnedToSubmit,
              teacherUserName,
            }),
          });
          updateResponse = await updateResponse.json();

          if (updateResponse.success) {
            const updatedAssignmentDetails = {
              updatedPoints: pointsEarnedToSubmit,
              percent: getGradePercentage(pointsEarnedToSubmit / maxPoints),
              grade: getLetterGrade(pointsEarnedToSubmit / maxPoints),
            };

            const addNewAssignmentToUpdatedAssignments = () => {
              updatedAssignmentsState.set([
                ...updatedAssignmentsState.state,
                {
                  ...updatedAssignmentDetails,
                  id: assignmentId,
                },
              ]);
            };

            if (updatedAssignmentsState.state.length > 0) {
              const result = updatedAssignmentsState.state.find(
                (assignment) => assignment.id === assignmentId,
              );
              if (result) {
                updatedAssignmentsState.set(
                  updatedAssignmentsState.state.map(
                    (
                      assignment, // don't destructure
                    ) =>
                      assignment.id === assignmentId
                        ? {
                            ...assignment,
                            ...updatedAssignmentDetails,
                          }
                        : assignment,
                  ),
                );
              } else addNewAssignmentToUpdatedAssignments();
            } else addNewAssignmentToUpdatedAssignments();

            clearPointsInput();
          }
        };
        updateAssignmentGrade();
      }}
    >
      <input
        className="assignments-table__points-earned-input"
        type="number"
        min={0}
        max={maxPoints}
        value={newPointsEarnedState.state}
        ref={pointsFormRef}
        autoFocus
        name=""
        id=""
        onChange={(e) => newPointsEarnedState.set(Number(e.target.value))}
        onKeyDown={({ key }) => key === "Escape" && clearPointsInput()}
      />
      /{maxPoints}
    </form>
  );
};

export default AssignmentPointsForm;
