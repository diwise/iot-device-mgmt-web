import DashCard from "../components/DashCard";
import './pages.css';

const Dash = ({ children }) => {
  return (
    <div className="dashboard-page">
      {children}
    </div>);
};

const Dashboard = ({ devices, alarms }) => {
  const DeviceStateOK = 1
  const DeviceStateWarning = 2
  const DeviceStateError = 3
  
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
        number="0"
        url="/devices/online"
        text="online"
      />
      <DashCard
        stylename="warning"
        number="0"
        url="/devices/warning"
        text="varningar"
      />
      <DashCard
        stylename="error"
        number="0"
        url="/devices/error"
        text="fel"
      />
      <DashCard
        stylename="error"
        number="0"
        url="/alarms"
        text="larm"
      />
    </Dash>
  );
};

export default Dashboard;
