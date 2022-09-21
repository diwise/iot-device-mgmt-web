import DashCard from "../components/DashCard";
import SearchCard from "../components/SearchCard";
import styled from "styled-components";
import HttpService from "../services/HttpService";
import { useEffect, useState } from "react";

const Dash = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    HttpService.getAxiosClient()
      .get('/api/v0/devices')
      .then((response) => setDevices(response.data))
  }, [])

  return (
    <>
      <Dash>
        <DashCard
          stylename="error"
          number={devices.filter((d) => d.status.code === 2).length}
          url="fel"
          text="enheter med fel"
        />
        <DashCard
          stylename="warning"
          number={devices.filter((d) => d.status.code === 1).length}
          url="varningar"
          text="enheter med varningar"
        />
        <DashCard
          stylename="active"
          number={devices.filter((d) => d.active).length}
          url="online"
          text="enheter online"
        />
        <DashCard
          stylename=""
          number={devices.length}
          url="devicelist"
          text="enheter totalt"
        />
      </Dash>
      <SearchCard />
    </>
  );
};

export default Dashboard;
