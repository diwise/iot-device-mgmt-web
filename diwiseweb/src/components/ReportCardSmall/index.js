import SearchResultCard from "../SearchResultCard";
import "./reportcardsmall.css";

const ReportCardSmall = (props) => {
  return (
    <div className="blockWrapper reportCard">
      <div className="blockContainer">
        <div className="blockTitle">
          <h2>Rapporter</h2>
        </div>

        <div className="blockContent deviceContent">
          <div className="reportCard">
            <div className="reportCardContent">
              <SearchResultCard
                deviceStatus="warning"
                deviceName="Enhet 1"
                deviceEnvironment="Vatten"
                deviceDate="05/06/2022, 16:33"
                errorMessage="Detta är ett varning-meddelande"
                deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
    diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
    finibus tempus tempus. Quisque suscipit maximus faucibus. In
    congue nunc sit amet arcu tincidunt faucibus vel non dolor."
                deviceUrl="device"
              />
              <SearchResultCard
                deviceStatus="warning"
                deviceName="Enhet 1"
                deviceEnvironment="Vatten"
                deviceDate="05/06/2022, 16:33"
                errorMessage="Detta är ett varning-meddelande"
                deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
    diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
    finibus tempus tempus. Quisque suscipit maximus faucibus. In
    congue nunc sit amet arcu tincidunt faucibus vel non dolor."
                deviceUrl="device"
              />
              <SearchResultCard
                deviceStatus="warning"
                deviceName="Enhet 1"
                deviceEnvironment="Vatten"
                deviceDate="05/06/2022, 16:33"
                errorMessage="Detta är ett varning-meddelande"
                deviceDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
    diam magna. Nam ultrices dolor ut nunc tempor semper. Vestibulum
    finibus tempus tempus. Quisque suscipit maximus faucibus. In
    congue nunc sit amet arcu tincidunt faucibus vel non dolor."
                deviceUrl="device"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardSmall;
