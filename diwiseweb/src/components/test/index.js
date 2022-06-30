import useCollapse from "react-collapsed";
import "./test.css";

function Section(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="preferences">
      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          <div className="title">{props.title}</div>
          {/* <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div> */}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">hej{props.children}</div>
        </div>
      </div>
    </div>
  );
}

function Test() {
  return <Section title="enhetsnamn" />;
}
export default Test;
