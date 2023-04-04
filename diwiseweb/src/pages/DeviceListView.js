import DeviceListCard from "../components/DeviceListCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './pages.css';

const DeviceListViewContainer = ({ children }) => {
  return (
    <div className="devicelist-page">
      {children}
    </div>
  );
}

const filterDeviceState = (items, deviceState) => {
  switch (deviceState) {
    case "online": return items.filter((d) => d.deviceState.online === true)
    case "warning": return items.filter((d) => d.deviceState.state === 2)
    case "error": return items.filter((d) => d.deviceState.state === 3)
    default: return items;
  }
};

const DeviceListView = ({ devices }) => {
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "deviceID"]);
  const { deviceState } = useParams();

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

      {filterDeviceState(search(devices), deviceState).map((device) => {
        return (
          <DeviceListCard
            key={device.deviceID}
            device={device}
          />
        );
      })}
    </DeviceListViewContainer>
  );
};

export default DeviceListView;
