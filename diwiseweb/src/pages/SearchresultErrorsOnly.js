import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";
import Test from "../components/test";

const SearchResultsErrorsOnly = () => {
  return (
    <>
      {/* <SearchCard /> */}
      <SearchResultCard
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
      <SearchResultCard
        deviceStatus="deviceWrapperError"
        deviceName="Enhet 1 med långt namn"
        deviceEnvironment="Vatten"
        deviceDate="05/06/2022, 16:33"
        errorMessage="Detta är ett error-meddelande"
        deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
      diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
      finibus tempus tempus. Quisque suscipit maximus faucibus. In
      congue nunc sit amet arcu tincidunt faucibus vel non dolor."
      />
    </>
  );
};

export default SearchResultsErrorsOnly;
