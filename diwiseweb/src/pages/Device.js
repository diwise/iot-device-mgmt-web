import DeviceCard from "../components/DeviceCard";
import CardTemplate from "../components/CardTemplate";
import { useEffect, useState } from "react";
import HttpService from "../services/HttpService";
import { useParams } from "react-router-dom";
import './pages.css';


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
    HttpService.getAxiosClient()
      .get("/api/v0/devices/" + deviceID)
      .then((response) => setDevice(response.data));
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
