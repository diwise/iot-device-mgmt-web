import { IconSolid } from "../Icons";
import "./devicecard.css";

const DeviceCard = ({ device }) => {
  return (
    <>
      <div><strong>Namn:</strong>{device.name}</div>
      <div><strong>Beskrivning:</strong>{device.description}</div>
      <div><strong>ID:</strong>{device.deviceID}</div>
      <div><strong>Typ:</strong>{device.sensorType.name}</div>
      <Location location={device.location} />
      <div><strong>Senast:</strong>{device.lastObserved}</div>
      <TypeIcons types={device.types} />
    </>
  );
};

const Location = ({ location }) => {
  if (location && location.latitude && location.longitude) {
    return (
      <>
        <div><strong>lat:</strong>{location.latitude}</div>
        <div><strong>lon:</strong>{location.longitude}</div>
      </>
    );
  }
  return <></>
}

const TypeIcons = ({ types }) => {
  return (
    <>
      <hr />
      <div>
        {types.includes('urn:oma:lwm2m:ext:3428') ? <IconSolid name="smog" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3327') ? <IconSolid name="bolt" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3200') ? <IconSolid name="toggle-on" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3304') ? <IconSolid name="droplet" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3301') ? <IconSolid name="lightbulb" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3434') ? <IconSolid name="people-group" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3302') ? <IconSolid name="hand" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3323') ? <IconSolid name="weight-hanging" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3303') ? <IconSolid name="temperature-half" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3330') ? <IconSolid name="route" color="grey" /> : <></>}
        {types.includes('urn:oma:lwm2m:ext:3424') ? <IconSolid name="gauge-simple-high" color="grey" /> : <></>}
      </div>
    </>
  );
}

export default DeviceCard;
