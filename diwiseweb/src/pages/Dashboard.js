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
        number={devices.filter((d) => d.deviceState.online === true).length}
        url="/devices/online"
        text="online"
      />
      <DashCard
        stylename="warning"
        number={devices.filter((d) => d.deviceState.state === DeviceStateWarning).length}
        url="/devices/warning"
        text="varningar"
      />
      <DashCard
        stylename="error"
        number={devices.filter((d) => d.deviceState.state === DeviceStateError).length}
        url="/devices/error"
        text="fel"
      />
      <DashCard
        stylename="error"
        number={alarms.length}
        url="/alarms"
        text="larm"
      />
    </Dash>
  );
};

export default Dashboard;
