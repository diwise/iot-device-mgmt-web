import DeviceCard from "../components/DeviceCard";
import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";
import ReportCardSmall from "../components/ReportCardSmall";
import HistoryCardSmall from "../components/HistoryCardSmall";

const DeviceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(3, 0);
  grid-template-rows: repeat(2, 1fr) 0 0;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-left: 16rem;
  align-items: center;
  max-width: fit-content;
`;

const Device = () => {
  return (
    <>
      <SubNavigation deviceName="Enhetsnamn" />
      <DeviceContainer>
        <DeviceCard deviceName="Enhetsnamn" />
        <ReportCardSmall />
        <HistoryCardSmall />
      </DeviceContainer>
    </>
  );
};

export default Device;
