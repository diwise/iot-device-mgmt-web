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

function fetchDataAndSetState(setDevices) {
  HttpService.getAxiosClient()
    .get("/api/v0/devices")
    .then((response) => setDevices(response.data));
}

function setUpdatedDevice(device, devices, setDevices) {
  // TODO: impl. replace one device
  fetchDataAndSetState(setDevices);
}

const filterStatus = (items, status) => {
  if (status !== undefined) {
    switch (status.toLowerCase()) {
      case "varningar":
        return items.filter((d) => d.status.statusCode === 1);
      case "fel":
        return items.filter((d) => d.status.statusCode === 2);
      case "online":
        return items.filter((d) => d.active);
      default:
        return items;
    }
  }

  return items;
};

const DeviceListView = () => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    fetchDataAndSetState(setDevices);
  }, []);

  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      fetchEventSource("/api/v0/events", {
        onopen(res) {
          console.log("connection established for deviceListView", res);
        },
        onmessage(event) {
          const parsedData = JSON.parse(event.data);
          if (parsedData !== null) {
            switch (parsedData.eventName) {
              case "devicesUpdated":
                fetchDataAndSetState(setDevices);
                break;
              case "deviceUpdated":
                setUpdatedDevice(parsedData.data, null, setDevices);
                break;
              default:
                break;
            }
          }
        },
      });
      setListening(true);
    }
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
