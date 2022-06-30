import "./searchresultcard.css";
import useCollapse from "react-collapsed";

function SearchResultCard(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className={`deviceWrapper ${props.deviceStatus}`}>
      <div className="deviceContainer" {...getToggleProps()}>
        <div className="device">
          <div className="deviceDate">{props.deviceDate}</div>
          <div className="deviceEnvironment">{props.deviceEnvironment}</div>
          <div className="deviceName">{props.deviceName}</div>
        </div>
        {/* <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div> */}
      </div>
      <div {...getCollapseProps()}>
        <div className="deviceContent">
          <div className="deviceStatus">
            Status
            <div>
              {props.errorMessage}
              {props.warningMessage}
            </div>
          </div>
          <div className="deviceDescription">
            Beskrivning
            <div>{props.deviceDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchResultCard;
