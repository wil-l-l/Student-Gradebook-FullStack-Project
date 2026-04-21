import "./PageCard.css";

const PageCard = ({ headingBoxChildren, list }) => {
  return (
    <div className="page-card">
      <div className="page-card__heading-box">{headingBoxChildren}</div>
      {
        <ul className="page-card__list">
          {list.map(({ key, children, onClickHandler = null }) => (
            <li
              key={key}
              className="page-card__list__item"
              onClick={onClickHandler}
            >
              {children}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default PageCard;
