import "./deviceListCard.css";
import useCollapse from "react-collapsed";
import DeviceIcon from "./deviceicon";
import StatusIcon from "./statusicon";
import { Link } from "react-router-dom";
import ChangeHighlight from "react-change-highlight";
import React from "react";

const TableRow = ({ header, value }) => {
  return (
    <tr>
      <th>{header}</th>
      <td>{value}</td>
    </tr>
  );
};

const StatusRow = ({ header, code, batteryLevel, messages }) => {
  let status = "OK";

  if (code >= 1 || (code > 2 && code <= 100)) {
    status = "varning";
  }

  if (code === 2) {
    status = "fel";
  }

  return (
    <>
      <TableRow header={header} value={status} />
      <TableRow header="Batterinivå" value={batteryLevel} />
    </>
  );
};

const LocationRow = ({ location }) => {
  return (
    <tr>
      <th>Position</th>
      <td>
        <ul>
          <li>{location !== undefined ? location.latitude : 0}</li>
          <li>{location !== undefined ? location.longitude : 0}</li>
        </ul>
      </td>
    </tr>
  );
};

function DeviceListCard({ defaultExpanded, collapsedHeight, device }) {
  const config = {
    defaultExpanded: defaultExpanded || false,
    collapsedHeight: collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  let status = device.active ? "active" : "inactive";
  if (device.status.statusCode === 1 || (device.status.statusCode > 2 && device.status.statusCode <= 100)) {
    status = "warning";
  }
  if (device.status.statusCode === 2) {
    status = "error";
  }

  return (
    <div className={`deviceWrapper ${status}`}>
      <div className="deviceContainer">
        <div className="grid device" {...getToggleProps()}>
          <strong>
            <StatusIcon />
            {device.active ? "Aktiv" : "Inaktiv"}
          </strong>
          <strong>{device.deviceID}</strong>
          <strong>{device.name}</strong>
          <strong>
            <ChangeHighlight>
              <div ref={React.createRef()}>{device.lastObserved != "0001-01-01T00:00:00Z" ? device.lastObserved : ""}</div>
            </ChangeHighlight>
          </strong>
        </div>
        <div className="contentWrapper" {...getCollapseProps()}>
          <div className="content">
            <table>
              <tbody>
                <TableRow header="devEUI" value={device.devEUI} />
                <TableRow header="deviceID" value={device.deviceID} />
                <TableRow header="Namn" value={device.name} />
                <TableRow header="Beskrivning" value={device.description} />
                <TableRow header="Miljö" value={device.environment} />
                <TableRow header="Sensortyp" value={device.sensorType !== undefined ? device.sensorType.name : ""} />
                <TableRow header="Senast" value={device.lastObserved} />
                <TableRow header="Tenant" value={device.tenant} />
                <LocationRow location={device.location} />
                <tr>
                  <th>Typer</th>
                  <td>{device.types}</td>
                </tr>
                <StatusRow header="Status" code={device.status.statusCode} batteryLevel={device.status.batteryLevel} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeviceListCard;
