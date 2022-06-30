import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";

let objects = 2;

export default function SearchResultsWarningsOnly() {
  const listedObjects = [...Array(objects)].map((e, i) => (
    <SearchResultCard
      key={i}
      deviceStatus="deviceWrapperError"
      deviceName="Enhet 1"
      deviceEnvironment="Vatten"
      deviceDate="05/06/2022, 16:33"
      errorMessage="Detta är ett error-meddelande"
      deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
        diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
        finibus tempus tempus. Quisque suscipit maximus faucibus. In
        congue nunc sit amet arcu tincidunt faucibus vel non dolor."
    />
  ));
  return <>{listedObjects}</>;
}
