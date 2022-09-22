import "./deviceList.css";
import { useEffect, useState } from "react";
import HttpService from "../../services/HttpService";

const Status = ({ status }) => {
  return <div>{status.code}</div>;
};

const DeviceRow = ({device}) => {
    return (
      <tr>
        <td>{device.devEUI}</td>
        <td>{device.deviceID}</td>
        <td>{device.name}</td>
        <td>{device.description}</td>
        <td>{device.environment}</td>
        <td>{device.active}</td>
        <td>{device.last_observed}</td>
        <td>{device.tenant}</td>
        <td><Status status={device.status} /></td>
      </tr>
    );
}

const DeviceList = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        HttpService.getAxiosClient()
        .get("/api/v0/devices")
        .then((response) => setDevices(response.data));
    }, []);

  const deviceRows = devices.map((d) => (
    <DeviceRow key={d.devEUI} device={d} />
  ));

    return (
      <table>
        <thead>
          <tr>
            <th>DevEUI</th>
            <th>DeviceID</th>
            <th>Namn</th>
            <th>Beskrivning</th>
            <th>Miljö</th>
            <th>Aktiv</th>
            <th>Senast</th>
            <th>Tenant</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{deviceRows}</tbody>
      </table>
    );
};

export default DeviceList;
