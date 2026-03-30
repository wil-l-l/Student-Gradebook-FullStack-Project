import "./AssignmentsTable.css";

const AssignmentsTable = ({ assignments }) => {
  return (
    <>
      <div className="assignments-table__info-bar">
        <p className="assignments-table__info-bar__item">Assignment:</p>
        <p className="assignments-table__info-bar__item">Points:</p>
        <p className="assignments-table__info-bar__item">Percent:</p>
        <p className="assignments-table__info-bar__item">Grade:</p>
        <p className="assignments-table__info-bar__item">Type:</p>
      </div>
      <ul className="assignments-table__list">
        {assignments.length === 0 ? (
          <p className="assignments-table__list__item__text">
            No assignments published for this class yet.
          </p>
        ) : (
          assignments.map(({ name, type, pointsEarned, maxPoints }) => (
            <li
              className="assignments-table__list__item"
              key={name + type.classwork}
            >
              <p className="assignments-table__list__item__text">{name}</p>
              <p className="assignments-table__list__item__text">
                {pointsEarned}/{maxPoints}
              </p>
              <p className="assignments-table__list__item__text">99%</p>
              <p className="assignments-table__list__item__text">A</p>
              <p className="assignments-table__list__item__text">{type.name}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default AssignmentsTable;
