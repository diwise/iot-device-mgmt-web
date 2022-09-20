import SearchResultCard from "../components/SearchResultCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";
import DeviceService from "../services/DeviceService";

export default function SearchResultsWarningsOnly() {
  const deviceData = DeviceService.useGetData();
  const filteredData = deviceData.length > 1 ? deviceData.filter((device) => device.status.code === 2) : deviceData
  const listedObjects = filteredData.map((device, i) => (
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
      deviceStatus="error"
    />
  ));

  const SearchResultContainer = styled.div`
    width: 95%;
    margin-right: auto;
    margin-left: auto;
  `;
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
