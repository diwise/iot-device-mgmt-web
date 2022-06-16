import DashCard from "../components/DashCard";

const Dashboard = () => {
  return (
    <>
      <DashCard
        activeNumber="104"
        activeText="enheter online"
        inactiveNumber="2"
        inactiveText="enheter med fel"
        totalNumber="118"
        totalText="enheter totalt"
      />
    </>
  );
};

export default Dashboard;
