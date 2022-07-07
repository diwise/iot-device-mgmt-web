import "./cardtemplate.css";

const DeviceCard = (props) => {
  return (
    <div className="blockWrapper">
      <div className="blockContainer">
        <div className="blockTitle">
          <h2>{props.header}</h2>
        </div>
        <div className="blockContent">{props.children}</div>
      </div>
    </div>
  );
};

export default DeviceCard;
