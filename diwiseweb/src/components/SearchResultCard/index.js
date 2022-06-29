import "./searchresultcard.css";
import useCollapse from "react-collapsed";

function SearchResultCard(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <>
      <div className="deviceWrapper">
        <div className="deviceContainer" {...getToggleProps()}>
          <div className="deviceStatus"></div>
          <div className="device">
            <div className="deviceName">Enhetsnamn</div>
            <div className="deviceEnvironment">Vatten</div>
            <div className="deviceLastObserved">05/06/2022, 16:53</div>
          </div>
        </div>
        <div className="collapsible">
          <div className="deviceStatus"></div>
          <div {...getCollapseProps()}>
            <div className="deviceContent">
              Now you can see the hidden content. <br />
              <br />
              Click again to hide...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchResultCard;
