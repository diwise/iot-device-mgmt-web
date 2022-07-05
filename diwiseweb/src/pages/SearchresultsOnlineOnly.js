import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";

let objects = 104;

export default function SearchResultsOnlineOnly() {
  const listedObjects = [...Array(objects)].map((e, i) => (
    <SearchResultCard
      key={i}
      deviceStatus="active"
      deviceName="Enhet 1"
      deviceEnvironment="Vatten"
      deviceDate="05/06/2022, 16:33"
      errorMessage="Fungerar"
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
      <SearchResultTop />
      {listedObjects}
    </SearchResultContainer>
  );
}
