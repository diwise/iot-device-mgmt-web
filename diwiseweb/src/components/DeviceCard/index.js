import "./devicecard.css";

const DeviceCard = (props) => {
  return (
    <div className="deviceContent">
      <div className="deviceCard">
        <div className="deviceCardContent">
          <div>
            <strong>Beskrivning:</strong>
          </div>
          <div>{props.description}</div>
          <div>
            <strong>Status:</strong>
          </div>
          <div>{props.status}</div>
        </div>
        <div className="deviceGrid">
          <div>
            <strong>Sensor-typ:</strong>
          </div>
          <div>{props.sensorType}</div>
          <div>
            <strong>Typ:</strong>
          </div>
          <div>{props.type}</div>
          <div>
            <strong>ID:</strong>
          </div>
          <div>{props.id}</div>
          <div>
            <strong>Latitud:</strong>
          </div>
          <div>{props.latitude}</div>
          <div>
            <strong>Longitud:</strong>
          </div>
          <div>{props.longitude}</div>
          <div>
            <strong>Miljö:</strong>
          </div>
          <div>{props.environment}</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
