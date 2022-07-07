import "./devicecard.css";

const DeviceCard = (props) => {
  return (
    <div className=" deviceContent">
      <div className="deviceCard">
        <div className="deviceCardContent">
          <div>
            <strong>Beskrivning:</strong>
          </div>
          <div>
            faowjkfaf as fas fa f flwn rfw qölfnwlörfnmöwmjrpqwk qwe wr wqr w r
          </div>
        </div>
        <div className="deviceGrid">
          <div>
            <strong>Sensor-typ:</strong>
          </div>
          <div>62.39281</div>
          <div>
            <strong>Typ:</strong>
          </div>
          <div> urn:oma:lwm2m:ext:3302</div>
          <div>
            <strong>ID:</strong>
          </div>
          <div>53aa3c08-eed8-4e7b-8bca-88f1937817ab</div>
          <div>
            <strong>Latitud:</strong>
          </div>
          <div>17.32109</div>
          <div>
            <strong>Longitud:</strong>
          </div>
          <div>17.32109</div>
          <div>
            <strong>Miljö:</strong>
          </div>
          <div>Vatten</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
