import "./reportcardsmall.css";

const ReportCardSmall = (props) => {
  return (
    <div className={`deviceWrapperSmall ${props.deviceStatus}`}>
      <div className="reportSmallContainer">
        <div className="reportSmall device">
          <strong>{props.deviceDate}</strong>

          <strong>{props.errorMessage}</strong>
        </div>
      </div>
    </div>
  );
};

export default ReportCardSmall;
