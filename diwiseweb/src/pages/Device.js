import DeviceCard from "../components/DeviceCard";
import CardTemplate from "../components/CardTemplate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './pages.css';
import UserService from "../services/UserService";


const DeviceContainer = ({ children }) => {
  return (
    <div className="device-page">
      {children}
    </div>
  );
}

const Device = () => {
  const [device, setDevice] = useState({})
  const { deviceID } = useParams();

  useEffect(() => {
    const loadDevice = async (token) => {
      let res = await fetch(`/api/v0/devices/${deviceID}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      let json = await res.json();
      setDevice(json);
    };
     
    loadDevice(UserService.getToken());
  }, [deviceID]);

  return (
    <DeviceContainer>
      <CardTemplate header="Enhetsnamn">
        <DeviceCard
          status="online"
          description={device.description}
          sensorType={device.sensorType !== undefined ? device.sensorType.name : ""}
          type={device.types}
          id={device.deviceID}
          latitude={device.position !== undefined ? device.position.latitude : 0}
          longitude={device.position !== undefined ? device.position.longitude : 0}
          environment={device.environment}
        />
      </CardTemplate>
      {
        /*
      <DeviceCardTransparent header="Rapporter">
        <ReportCardSmall
          deviceStatus="error"
          deviceDate="05/06/2022, 16:33"
          errorMessage="Detta är ett error meddelande"
          deviceUrl="device"
        />
        <ReportCardSmall
          deviceStatus="warning"
          deviceDate="05/06/2022, 16:33"
          errorMessage="Varningmeddelande"
          deviceUrl="device"
        />
        <ReportCardSmall
          deviceStatus="warning"
          deviceDate="05/06/2022, 16:33"
          errorMessage="Varningmeddelande"
          deviceUrl="device"
        />
      </DeviceCardTransparent>
      <DeviceCardTransparent header="Historik">
        <HistoryCardSmall date="06/09/2022, 14:23" updatedField="Beskrivning" />
        <HistoryCardSmall date="06/09/2022, 14:23" updatedField="Koordinater" />
        <HistoryCardSmall date="06/09/2022, 14:23" updatedField="Beskrivning" />
      </DeviceCardTransparent>
        */
      }
    </DeviceContainer>
  );
};

export default Device;
