import DeviceListCard from "../components/DeviceListCard";
import styled from "styled-components";
import HttpService from "../services/HttpService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const DeviceListViewContainer = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
`;

const filterStatus = (items, status) => {
  if (status !== undefined) {
    switch (status.toLowerCase()) {
      case "varningar":
        return items.filter((d) => d.status.statusCode === 1 && d.lastObserved != "0001-01-01T00:00:00Z");
      case "fel":
        return items.filter((d) => d.status.statusCode === 2);
      case "online":
        return items.filter((d) => d.active && d.lastObserved != "0001-01-01T00:00:00Z");
      default:
        return items;
    }
  }

  return items;
};

const DeviceListView = () => {
  const [devices, setDevices] = useState([]);

  const updateState = (s, obj) => {
    let newState = [];
    const i = s.findIndex(x => x.devEUI === obj.devEUI);

    if (i > -1) {
      s[i] = obj;
      newState = [...s]
    } else {
      newState = [...s, obj]
    }    

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

  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "deviceID"]);
  const { status } = useParams();

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <DeviceListViewContainer>
      <div className="searchForm">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="mb-3"
            placeholder="Filtrera på namn eller deviceID..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
        </label>
      </div>

      {filterStatus(search(devices), status).map((device) => {
        return (
          <DeviceListCard
            key={device.devEUI}
            device={device}
            deviceStatus={status}
          />
        );
      })}
    </DeviceListViewContainer>
  );
};

export default DeviceListView;
