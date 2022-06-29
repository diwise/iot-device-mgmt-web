import "./dashcard.css";

const DashCard = (props) => {
  return (
    <>
      <a href={props.url}>
        <div className="dashCard">
          <div className={props.stylename}>{props.number}</div>
          <div className="dashText">{props.text}</div>
        </div>
      </a>
    </>
  );
};

export default DashCard;
