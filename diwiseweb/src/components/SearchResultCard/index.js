import "./searchresultcard.css";
import useCollapse from "react-collapsed";

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
          <div class="grid device" {...getToggleProps()}>
            <div>{props.deviceName}</div>
            <div>{props.deviceEnvironment}</div>
            <div>{props.deviceDate}</div>
          </div>
          <div class="content" {...getCollapseProps()}>
            <strong>Status</strong>
            {props.errorMessage}
            {props.warningMessage}
            <div>{props.deviceDescription}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchResultCard;
