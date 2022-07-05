import "./searchresultcard.css";
import useCollapse from "react-collapsed";
import DeviceIcon from "./deviceicon";
import StatusIcon from "./statusicon";

function SearchResultCard(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <>
      <div className={`deviceWrapper ${props.deviceStatus}`}>
        <div className="deviceContainer">
          <div className="grid device" {...getToggleProps()}>
            <strong>{props.deviceName}</strong>
            <strong>{props.deviceEnvironment}</strong>
            <strong>{props.deviceDate}</strong>
          </div>
          <div className="contentWrapper" {...getCollapseProps()}>
            <div className="content">
              <div className={`status ${props.deviceStatus}`}>
                <div className={`statusIcon ${props.deviceStatus}`}>
                  <StatusIcon />
                </div>
                <div>
                  {props.errorMessage} {props.warningMessage}
                </div>
              </div>
              <div className="description">
                <strong>Beskrivning:</strong>
                <div>{props.deviceDescription}</div>
              </div>
              <a href={props.deviceUrl}>
                <DeviceIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchResultCard;
