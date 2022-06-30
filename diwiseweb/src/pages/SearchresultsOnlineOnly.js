import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";

let objects = 104;

export default function SearchResultsOnlineOnly() {
  const listedObjects = [...Array(objects)].map((e, i) => (
    <SearchResultCard
      key={i}
      deviceStatus="deviceWrapperActive"
      deviceName="Enhet 1"
      deviceEnvironment="Vatten"
      deviceDate="05/06/2022, 16:33"
      errorMessage="Fungerar"
      deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
        diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
        finibus tempus tempus. Quisque suscipit maximus faucibus. In
        congue nunc sit amet arcu tincidunt faucibus vel non dolor."
    />
  ));
  return <>{listedObjects}</>;
}
