import "./cardtemplatetransparent.css";

const DeviceCard = (props) => {
  return (
    <div className="TransparentCardWrapper">
      <div className="TransparentCardContainer">
        <div className="TransparentCardTitle">
          <h2>{props.header}</h2>
        </div>
        <div className="TransparentCardContent">{props.children}</div>
      </div>
    </div>
  );
};

export default DeviceCard;
