import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";

let objects = 3;

export default function SearchResultsWarningsOnly() {
  const listedObjects = [...Array(objects)].map((e, i) => (
    <SearchResultCard
      key={i}
      deviceStatus="warning"
      deviceName="Namn på enhet"
      deviceEnvironment="Vatten"
      deviceDate="05/06/2022, 16:33"
      errorMessage="Detta är ett varning-meddelande"
      deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
    diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
    finibus tempus tempus. Quisque suscipit maximus faucibus. In
    congue nunc sit amet arcu tincidunt faucibus vel non dolor."
      deviceUrl="device"
    />
  ));

  const SearchResultContainer = styled.div`
    width: 95%;
    margin-right: auto;
    margin-left: auto;
  `;
  return (
    <SearchResultContainer>
      <SearchResultTop columnOne="Namn" columnTwo="Miljö" columnThree="Datum" />
      {listedObjects}
    </SearchResultContainer>
  );
}
