import "./dashcard.css";

const DashCard = ({url, stylename, number, text}) => {
  return (
    <>
      <a href={"/device-management/"+url}>
        <div className="dashCard">
          <div className={stylename}>{number}</div>
          <div className="dashText">{text}</div>
        </div>
      </a>
    </>
  );
};

export default DashCard;
