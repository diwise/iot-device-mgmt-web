import SearchResultCard from "../SearchResultCard";
import "./historycardsmall.css";

const HistoryCardSmall = (props) => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <strong>{props.date}</strong>
          <strong>{props.updatedField}</strong>
        </div>
      </div>
    </div>
  );
};

export default HistoryCardSmall;
