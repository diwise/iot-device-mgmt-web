import DeviceCard from "../components/DeviceCard";
import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";
import ReportCardSmall from "../components/ReportCardSmall";
import HistoryCardSmall from "../components/HistoryCardSmall";
import CardTemplate from "../components/CardTemplate";
import DeviceCardTransparent from "../components/CardTemplateTransparent";
import SearchResultCard from "../components/SearchResultCard";

const DeviceContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(3, 0);
  grid-template-rows: repeat(2, 1fr) 0 0;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  align-items: center;
  max-width: fit-content; */
  margin-left: 15rem;
`;

const Device = () => {
  return (
    <>
      <SubNavigation deviceName="Enhetsnamn" />
      <DeviceContainer>
        <CardTemplate header="Enhetsnamn">
          <DeviceCard />
        </CardTemplate>
        <DeviceCardTransparent header="Rapporter">
          <SearchResultCard
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <SearchResultCard
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <SearchResultCard
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <SearchResultCard
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <SearchResultCard
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
        </DeviceCardTransparent>
        <DeviceCardTransparent header="Historik"></DeviceCardTransparent>
      </DeviceContainer>
    </>
  );
};

export default Device;
