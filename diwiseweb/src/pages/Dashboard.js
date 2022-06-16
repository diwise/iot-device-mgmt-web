import DashCard from "../components/DashCard";
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
        <DashCard stylename="active" number="104" text="enheter online" />
        <DashCard stylename="inactive" number="2" text="enheter med fel" />
        <DashCard stylename="" number="104" text="enheter totalt" />
      </Dash>
    </>
  );
};

export default Dashboard;
