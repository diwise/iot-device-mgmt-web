import { React } from "react";
import { useCollapse } from "@collapsed/react";
import { Link } from "react-router-dom";
import StatusIcon from "./statusicon";
import "./deviceListCard.css";

const DeviceListCard = ({ defaultExpanded, collapsedHeight, device }) => {
  const config = {
    defaultExpanded: defaultExpanded || false,
    collapsedHeight: collapsedHeight || 0,
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  let statusClass = "";
  switch (device.deviceState.state) {
    case -1: statusClass = "unknown"; break;
    case 1: statusClass = "ok"; break;
    case 2: statusClass = "warning"; break;
    case 3: statusClass = "error"; break;
    default: statusClass = "active"; break;
  }
  if (!device.active) {
    statusClass = "inactive";
  }

  let lastObserved = new Date(device.deviceState.observedAt).toISOString();

  return (
    <div className={`deviceWrapper ${statusClass}`}>
      <div className="deviceContainer">
        <div className="grid device" {...getToggleProps()}>

          <strong>{device.deviceID}</strong>
          <strong>{device.name}</strong>

          <strong>{lastObserved}</strong>
          <strong><div className={`statusIcon ${statusClass}`}><StatusIcon /></div></strong>
        </div>
        <div className="contentWrapper" {...getCollapseProps()}>
          <div className="content">
            <DeviceInfo device={device} />
            <DeviceProfile device={device} />
            <DeviceState device={device} />
            <Location device={device} />
            <Tenant device={device} />
            <Lwm2mTypes device={device} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DeviceInfo = ({ device }) => {
  return (
    <>
      <div><strong>ID:</strong>{device.sensorID}</div>
      <div><strong>DeviceID:</strong><Link to={"/device/" + device.deviceID}>{device.deviceID}</Link></div>
      <div><strong>Namn:</strong>{device.name}</div>
      <div><strong>Beskrivning:</strong>{device.description}</div>
      <div><strong>Miljö:</strong>{device.environment}</div>
    </>
  );
};

const Lwm2mTypes = ({ device }) => {
  return (
    <div>
      <div><strong>Lwm2m</strong></div>
      <ul>
        {device.types.map((t) => {
          return (
            <li key={t.urn}>{t.urn}</li>
          );
        })}
      </ul>
    </div>
  );
};

const Location = ({ device }) => {
  return (
    <>
      <div><strong>Position</strong></div>
      <ul>
        <li><strong>Lat:</strong>{device.location.latitude}</li>
        <li><strong>Lon:</strong>{device.location.longitude}</li>
        <li><strong>Alt:</strong>{device.location.altitude}</li>
      </ul>
    </>
  );

};

const DeviceState = ({ device }) => {
  let state = "";
  switch (device.deviceState.state) {
    case -1: state = "-"; break;
    case 2: state = "Varning"; break;
    case 3: state = "Fel"; break;
    default:
      state = "Ok"; break;
  }

  return (
    <div>
      <div><strong>Online:</strong>{device.deviceState.online ? "Online" : "Offline"}</div>
      <div><strong>State:</strong>{state}</div>
      <div><strong>Tid:</strong>{new Date(device.deviceState.observedAt).toISOString()}</div>
    </div>
  );
};

const DeviceProfile = ({ device }) => {
  return (
    <div>
      <div><strong>Namn:</strong>{device.deviceProfile.name}</div>
      <div><strong>Dekoder:</strong>{device.deviceProfile.decoder}</div>
    </div>
  );
};

const Tenant = ({ device }) => {
  return (
    <div><strong>Tenant:</strong>{device.tenant.name}</div>
  );
};

export default DeviceListCard;

export { DeviceInfo, DeviceState, Tenant, DeviceProfile, Location, Lwm2mTypes }