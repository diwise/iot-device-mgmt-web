import DeviceCard from "../components/DeviceCard";
import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";

const DeviceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 16rem;
`;

const Device = () => {
  return (
    <DeviceContainer>
      <SubNavigation />
      <DeviceCard deviceName="Enhetsnamn" />
      <DeviceCard deviceName="Enhetsnamn" />
      <DeviceCard deviceName="Enhetsnamn" />
    </DeviceContainer>
  );
};

export default Device;
