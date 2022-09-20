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
            <strong><StatusIcon />{props.deviceActive}</strong>
            <strong>{props.deviceID}</strong>
            <strong>{props.deviceName}</strong>
            <strong>{props.deviceDate}<a href={props.deviceUrl}><DeviceIcon /></a></strong>
          </div>
          <div className="contentWrapper" {...getCollapseProps()}>
            <div className="content">
              <table>
                <tbody>
                  <tr><th>Beskrivning</th><td>{props.deviceDescription}</td></tr>
                  <tr><th>Position</th><td><ul><li>{props.latitude}</li><li>{props.longitude}</li></ul></td></tr>
                  <tr><th>Sensortyp</th><td>{props.sensorType}</td></tr>
                  
                  <tr><th>Tenant</th><td>{props.tenant}</td></tr>
                  <tr><th>Status</th><td>{props.errorMessage}&nbsp;{props.warningMessage}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchResultCard;
