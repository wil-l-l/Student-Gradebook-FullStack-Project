import "./PageCard.css";

const PageCard = ({ headingBoxChildren, list }) => {
  return (
    <div className="page-card">
      <div className="page-card__heading-box">{headingBoxChildren}</div>
      {
        <ul className="page-card__list">
          {list.map(
            ({
              key,
              children,
              onClickHandler = null,
              customClasses = null,
            }) => (
              <li
                key={key}
                className={`page-card__list__item ${customClasses ? customClasses : ""}`}
                onClick={onClickHandler}
              >
                {children}
              </li>
            ),
          )}
        </ul>
      }
    </div>
  );
};

export default PageCard;
