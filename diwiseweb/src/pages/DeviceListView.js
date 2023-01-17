import DeviceListCard from "../components/DeviceListCard";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DeviceListViewContainer = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
`;

const filterStatus = (items, status) => {
  if (status !== undefined) {
    switch (status.toLowerCase()) {
      case "varningar":
        return items.filter((d) => d.status.statusCode === 1 && d.lastObserved !== "0001-01-01T00:00:00Z");
      case "fel":
        return items.filter((d) => d.status.statusCode === 2);
      case "online":
        return items.filter((d) => d.active && d.lastObserved !== "0001-01-01T00:00:00Z");
      default:
        return items;
    }
  }

  return items;
};

const DeviceListView = ({devices}) => {
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
