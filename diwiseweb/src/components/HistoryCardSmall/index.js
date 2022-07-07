import SearchResultCard from "../SearchResultCard";
import "./historycardsmall.css";

const HistoryCardSmall = (props) => {
  return (
    <div className="historyWrapperSmall">
      <div className="historySmallContainer">
        <div className="historySmall device grid">
          <strong>{props.date}</strong>
          <strong>{props.updatedField}</strong>
          <strong>{props.name}</strong>
        </div>
      </div>
    </div>
  );
};

export default HistoryCardSmall;
