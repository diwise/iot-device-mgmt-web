import DashCard from "../components/DashCard";
import './pages.css';

const Dash = ({ children }) => {
  return (
    <div className="dashboard-page">
      {children}
    </div>);
};

const Dashboard = ({ devices }) => {
  return (
    <Dash>
      <DashCard
        stylename=""
        number={devices.length}
        url="devices"
        text="enheter totalt"
      />
      <DashCard
        stylename="active"
        number={devices.filter((d) => d.active && d.lastObserved !== "0001-01-01T00:00:00Z").length}
        url="/devices/online"
        text="online"
      />
      <DashCard
        stylename="warning"
        number={devices.filter((d) => d.status.statusCode === 1 && d.lastObserved !== "0001-01-01T00:00:00Z").length}
        url="/devices/varningar"
        text="varningar"
      />
      <DashCard
        stylename="error"
        number={devices.filter((d) => d.status.statusCode === 2).length}
        url="/devices/fel"
        text="fel"
      />
    </Dash>
  );
};

export default Dashboard;
