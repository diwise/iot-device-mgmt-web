import "./dashcard.css";

const DashCard = (props) => {
  return (
    <>
      <div className="dashCard">
        <div className={props.stylename}>{props.number}</div>
        <div className="dashText">{props.text}</div>
      </div>
    </>
  );
};

export default DashCard;
