import "./dashcard.css";
import { Link } from "react-router-dom";

const DashCard = ({url, stylename, number, text}) => {
  return (
    <Link to={ url } >
      <div className="dashCard">
        <div className={stylename}>{number}</div>
        <div className="dashText">{text}</div>
      </div>
    </Link>
  );
};

export default DashCard;
