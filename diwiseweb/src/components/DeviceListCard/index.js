import React from "react";
import ChangeHighlight from "react-change-highlight";
import useCollapse from "react-collapsed";
import StatusIcon from "./statusicon";
import "./deviceListCard.css";

function DeviceListCard({ defaultExpanded, collapsedHeight, device }) {
  const config = {
    defaultExpanded: defaultExpanded || false,
    collapsedHeight: collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  let statusClass = device.active ? "active" : "inactive";
  switch (device.status.statusCode) {
    case -1: statusClass = "inactive"; break;
    case 0: statusClass = "active"; break;
    case 1: statusClass = "warning"; break;
    case 2: statusClass = "error"; break;
  }

  let lastObserved = device.lastObserved !== "0001-01-01T00:00:00Z" ? device.lastObserved : "";

  if (lastObserved === "") {
    statusClass = "inactive";
  }

  return (
    <div className={`deviceWrapper ${statusClass}`}>
      <div className="deviceContainer">
        <div className="grid device" {...getToggleProps()}>
          <strong><StatusIcon />{device.active ? "Aktiv" : "Inaktiv"}</strong>
          <strong>{device.deviceID}</strong>
          <strong>{device.name}</strong>
          <strong><ChangeHighlight><div ref={React.createRef()}>{lastObserved}</div></ChangeHighlight></strong>
        </div>
        <div className="contentWrapper" {...getCollapseProps()}>
          <div className="content">
            <div><strong>devEUI:</strong>{device.devEUI}</div>
            <div><strong>deviceID:</strong>{device.deviceID}</div>
            <div><strong>Namn:</strong>{device.name}</div>
            <div><strong>Beskrivning:</strong>{device.description}</div>
            <div><strong>Miljö:</strong>{device.environment}</div>
            <div><strong>Sensortyp:</strong>{device.sensorType !== undefined ? device.sensorType.name : ""}</div>
            <div><strong>Senast:</strong>{lastObserved}</div>
            <div><strong>Tenant:</strong>{device.tenant}</div>
            <div><Location location={device.location} /></div>
            <div><Types types={device.types} /></div>
            <div><Status status={device.status} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Types = ({ types }) => {
  return (
    <>
      <strong>Typer:</strong>
      <p>
        {types.map((t) => {
          return (
            <div key={t}>{t}</div>
          );
        })}
      </p>
    </>
  );
}

const Status = ({ status }) => {
  let messages = status.statusMessages !== undefined ? status.statusMessages : [];
  let statusCode = "";
  let batteryLevel = status.batteryLevel !== undefined ? status.batteryLevel : 0;
  switch (status.statusCode) {
    case -1: statusCode = "Okänd"; break;
    case 1: statusCode = "Varning"; break;
    case 2: statusCode = "Fel"; break;
    default: statusCode = "OK";
  }

  return (
    <div className="status">
      <strong>Status:</strong>
      <p><strong>Kod:</strong>{statusCode}</p>
      <p><strong>Batterinivå:</strong>{batteryLevel}</p>
      <p><strong>Meddelanden:</strong>
        <p>
          {messages.map((m) => {
            return (
              <div key={m}>{m}<br /></div>
            )
          })}
        </p>
      </p>
    </div>
  );
};

const Location = ({ location }) => {
  let lat = location.latitude !== undefined ? location.latitude : 0;
  let lon = location.longitude !== undefined ? location.longitude : 0;

  return (
    <>
      <strong>Position:</strong>
      <p><strong>Lat:</strong>{lat}</p>
      <p><strong>Lon:</strong>{lon}</p>
    </>
  )
};

export default DeviceListCard;
