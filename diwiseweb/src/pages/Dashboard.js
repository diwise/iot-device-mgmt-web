import DashCard from "../components/DashCard";
import SearchCard from "../components/SearchCard";
import styled from "styled-components";
import DeviceService from "../services/DeviceService";
import Device from "./Device";

const Dash = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const deviceData = DeviceService.useGetData();

  return (
    <>
      <Dash>
        <DashCard
          stylename="error"
          number="2"
          url="fel"
          text="enheter med fel"
        />
        <DashCard
          stylename="warning"
          number="3"
          url="varningar"
          text="enheter med varningar"
        />
        <DashCard
          stylename="active"
          number="104"
          url="online"
          text="enheter online"
        />
        <DashCard 
          stylename=""
          number={deviceData.length}
          url="total"
          text="enheter totalt"
        />
      </Dash>
      <SearchCard />
    </>
  );
};

export default Dashboard;
