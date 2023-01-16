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

const Dashboard = () => {
  const [devices, setDevices] = useState([]);

  const updateState = (s, obj) => {
    let newState = [];
    const i = s.findIndex(x => x.id === obj.id);

    if (i > -1) {
      s[i] = obj;
      newState = [...s]
    } else {
      newState = [...s, obj]
    }

    console.log(newState)

    return newState;
  }

  useEffect(() => {
    HttpService.getAxiosClient()
      .get("/api/v0/devices")
      .then((response) => setDevices(response.data));
  }, []);


  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      fetchEventSource(`/api/v0/events`, {
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          const obj = JSON.parse(event.data);
          console.log(obj)
          setDevices((s) => updateState(s, obj))
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
      setListening(true);
    };
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
