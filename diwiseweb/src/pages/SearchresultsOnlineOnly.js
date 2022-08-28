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
  console.log("number of devices in online results: ", deviceData.length)

  const listedObjects = [...Array(deviceData)].map((device, i) => (
    <SearchResultCard
      key={i}
      deviceStatus={device[i].active}
      deviceName={device[i].devEUI}
      deviceEnvironment={device[i].environment}
      deviceDate={device[i].last_observed}
      errorMessage="Fungerar"
      deviceDescription={device[i].description}
      deviceUrl="deviceUrl"
    />
  ));

  return (
    <SearchResultContainer>
      <SearchResultTop columnOne="Namn" columnTwo="Miljö" columnThree="Datum" />
      {listedObjects}
    </SearchResultContainer>
  );
}
