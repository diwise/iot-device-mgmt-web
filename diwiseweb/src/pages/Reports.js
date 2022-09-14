import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";
import ReportCardSmall from "../components/ReportCardSmall";
import DeviceCardTransparent from "../components/CardTemplateTransparent";

const DeviceContainer = styled.div`
  @media only screen and (min-width: 772px) {
    margin-left: 16rem;
  }

  @media only screen and (max-width: 771px) {
    margin-left: auto;
    margin-right: auto;
  }
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;

const Device = () => {
  return (
    <>
      <SubNavigation deviceName="Enhetsnamn" />
      <DeviceContainer>
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
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <ReportCardSmall
            deviceStatus="warning"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <ReportCardSmall
            deviceStatus="error"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
          <ReportCardSmall
            deviceStatus="warning"
            deviceDate="05/06/2022, 16:33"
            errorMessage="Detta är ett error meddelande"
            deviceUrl="device"
          />
        </DeviceCardTransparent>
      </DeviceContainer>
    </>
  );
};

export default Device;
