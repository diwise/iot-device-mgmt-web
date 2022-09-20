import DashCard from "../components/DashCard";
import SearchCard from "../components/SearchCard";
import styled from "styled-components";
import DeviceService from "../services/DeviceService";

const Dash = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const deviceData = DeviceService.useGetData();
  const total = deviceData.length

  let active = 0
  let warnings = 0
  let errors = 0

  if (deviceData.length > 1) {
    active = deviceData.filter((d) => d.active).length
    warnings = deviceData.filter((d) => d.status.code === 1).length
    errors = deviceData.filter((d) => d.status.code === 2).length
  }

  return (
    <>
      <Dash>
        <DashCard
          stylename="error"
          number={ errors }
          url="fel"
          text="enheter med fel"
        />
        <DashCard
          stylename="warning"
          number={warnings}
          url="varningar"
          text="enheter med varningar"
        />
        <DashCard
          stylename="active"
          number={active}
          url="online"
          text="enheter online"
        />
        <DashCard
          stylename=""
          number={total}
          url=""
          text="enheter totalt"
        />
      </Dash>
      <SearchCard />
    </>
  );
};

export default Dashboard;
