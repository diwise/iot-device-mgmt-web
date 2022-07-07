import SubNavigation from "../components/SubNavigation";
import styled from "styled-components";
import HistoryCardSmall from "../components/HistoryCardSmall";
import DeviceCardTransparent from "../components/CardTemplateTransparent";
import SearchResultTop from "../components/SearchResultTop";

const DeviceContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(3, 0);
  grid-template-rows: repeat(2, 1fr) 0 0;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  align-items: center;
  max-width: fit-content; */
  @media only screen and (min-width: 1235px) {
    margin-left: 14.5rem;
  }
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const History = () => {
  return (
    <>
      <SubNavigation deviceName="Enhetsnamn" />
      <DeviceContainer>
        <DeviceCardTransparent header="Historik">
          <SearchResultTop
            columnOne="Datum"
            columnTwo="Förändring"
            columnThree="Användare"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Ola Larsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Koordinater"
            name="Ola Larsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Linnea Eriksson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Hanna Thorén"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Koordinater"
            name="Ola Larsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Koordinater"
            name="Erik Bengtsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Erik Bengtsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Koordinater"
            name="Ola larsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Erik Bengtsson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Beskrivning"
            name="Linnea Eriksson"
          />
          <HistoryCardSmall
            date="06/09/2022, 14:23"
            updatedField="Koordinater"
            name="Karin Laveson"
          />
        </DeviceCardTransparent>
      </DeviceContainer>
    </>
  );
};

export default History;
