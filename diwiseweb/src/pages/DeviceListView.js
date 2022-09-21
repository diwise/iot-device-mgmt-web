import SearchResultCard from "../components/SearchResultCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";
import HttpService from "../services/HttpService";
import { useEffect, useState } from "react";

const SearchResultContainer = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
`;

const DeviceListView = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    HttpService.getAxiosClient()
      .get("/api/v0/devices")
      .then((response) => setDevices(response.data));
  }, []);

  const listedObjects = devices
    .map((device) => {

      let status = device.active ? "active" : "inactive"
      if (device.status.code === 1) { status = "warning" }
      if (device.status.code === 1) { status = "error" }

      return (
        <SearchResultCard
          key={device.devEUI}
          deviceID={device.deviceID}
          deviceName={device.name}
          deviceDescription={device.description}
          latitude={device.latitude}
          longitude={device.longitude}
          deviceEnvironment={device.environment}
          types={device.types}
          deviceDate={device.last_observed}
          sensorType={device.sensor_type}
          deviceActive={device.active ? "aktiv" : "inaktiv"}
          tenant={device.tenant}
          errorMessage="Fungerar"
          deviceUrl="deviceUrl"
          deviceStatus={ status }
        />
    )});

  return (
    <SearchResultContainer>
      <SearchResultTop
        columnOne="Aktiv"
        columnTwo="Identitet"
        columnThree="Namn"
        columnFour="Senast"
      />
      {listedObjects}
    </SearchResultContainer>
  );
};

export default DeviceListView;