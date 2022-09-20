import SearchResultCard from "../components/SearchResultCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";
import DeviceService from "../services/DeviceService";

const SearchResultContainer = styled.div`
width: 95%;
margin-right: auto;
margin-left: auto;
`;

export default function SearchResultsOnlineOnly() {
  const deviceData = DeviceService.useGetData();

  const listedObjects = deviceData
    .filter((d) => d.active)
    .map((device, i) => (
      <SearchResultCard
        key={i}
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
        deviceStatus="active"
      />
    ));

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
}
