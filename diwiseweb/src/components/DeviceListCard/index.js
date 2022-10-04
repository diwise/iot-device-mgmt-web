import "./deviceListCard.css";
import useCollapse from "react-collapsed";
import DeviceIcon from "./deviceicon";
import StatusIcon from "./statusicon";
import { Link } from "react-router-dom";

const TableRow = ({ header, value }) => {
  return (
    <tr>
      <th>{header}</th>
      <td>{value}</td>
    </tr>
  );
};

const StatusRow = ({ header, code, messages }) => {
  let status = "OK";
  if (code === 1) {
    status = "warning";
  }
  if (code === 2) {
    status = "error";
  }

  return <TableRow header={header} value={status} />;
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
  if (device.status.statusCode === 1) {
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
            {device.last_observed}
            <Link to={"/device/" + device.deviceID}>
              <DeviceIcon />
            </Link>
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
                <TableRow header="Sensortyp" value={device.sensor_type} />
                <TableRow header="Senast" value={device.last_observed} />
                <TableRow header="Tenant" value={device.tenant} />
                <LocationRow location={device.location} />
                <tr>
                  <th>Typer</th>
                  <td>{device.types}</td>
                </tr>
                <StatusRow header="Status" code={device.status.statusCode} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeviceListCard;
