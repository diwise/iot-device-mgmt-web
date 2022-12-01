import DashCard from "../components/DashCard";
import styled from "styled-components";
import HttpService from "../services/HttpService";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const Dash = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

function fetchDataAndSetState(setDevices) {
  HttpService.getAxiosClient()
    .get("/api/v0/devices")
    .then((response) => setDevices(response.data));
}

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    fetchDataAndSetState(setDevices);
  }, []);

  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      fetchEventSource("/api/v0/events", {
        onopen(res) {
          console.log("connection established for dashboard", res);
        },
        onmessage(event) {
          const parsedData = JSON.parse(event.data);
          if (parsedData !== null) {
            console.log(parsedData);
            fetchDataAndSetState(setDevices);
          }
        },
        onclose() {
          console.log("connection closed")
          setListening(false)
        },
        onerror(err) {
          console.error("received error", err)
        }
      });
      setListening(true);
    }
  }, [listening]);

  return (
    <>
      <Dash>
        <DashCard
          stylename="error"
          number={devices.filter((d) => d.status.statusCode === 2).length}
          url="/devices/fel"
          text="enheter med fel"
        />
        <DashCard
          stylename="warning"
          number={devices.filter((d) => d.status.statusCode === 1).length}
          url="/devices/varningar"
          text="enheter med varningar"
        />
        <DashCard
          stylename="active"
          number={devices.filter((d) => d.active).length}
          url="/devices/online"
          text="enheter online"
        />
        <DashCard
          stylename=""
          number={devices.length}
          url="devices"
          text="enheter totalt"
        />
      </Dash>
    </>
  );
};

export default Dashboard;
