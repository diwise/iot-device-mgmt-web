import DashCard from "../components/DashCard";
import SearchCard from "../components/SearchCard";
import styled from "styled-components";

const Dash = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  return (
    <>
      <Dash>
        <DashCard stylename="inactive" number="2" text="enheter med fel" />
        <DashCard stylename="warning" number="3" text="enheter med varningar" />
        <DashCard stylename="active" number="104" text="enheter online" />
        <DashCard stylename="" number="109" text="enheter totalt" />
      </Dash>
      <SearchCard />
    </>
  );
};

export default Dashboard;
