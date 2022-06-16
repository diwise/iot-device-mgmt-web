import "./dashcard.css";

const DashCard = (props) => {
  return (
    <>
      <div className="dashboard">
        <div className="dashCard darkTheme">
          <div className="numbers active">{props.activeNumber}</div>
          <div>{props.activeText}</div>
        </div>
        <div className="dashCard darkTheme">
          <div className="numbers inactive">{props.inactiveNumber}</div>
          <div>{props.inactiveText}</div>
        </div>
        <div className="dashCard darkTheme">
          <div className="numbers">{props.totalNumber}</div>
          <div>{props.totalText}</div>
        </div>
      </div>
    </>
  );
};

export default DashCard;
