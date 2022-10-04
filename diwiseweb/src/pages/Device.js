import DeviceCard from "../components/DeviceCard";
//import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";
//import ReportCardSmall from "../components/ReportCardSmall";
//import HistoryCardSmall from "../components/HistoryCardSmall";
import CardTemplate from "../components/CardTemplate";
//import DeviceCardTransparent from "../components/CardTemplateTransparent";
import { useEffect, useState } from "react";
import HttpService from "../services/HttpService";
import { useParams } from "react-router-dom";

const DeviceContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(3, 0);
  grid-template-rows: repeat(2, 1fr) 0 0;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  align-items: center;
  max-width: fit-content; */
  @media only screen and (min-width: 772px) {
    margin-left: 16rem;
    align-items: flex-start;
    align-self: flex-start;
  }
  align-self: center;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

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
          sensorType={device.sensor_type}
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
