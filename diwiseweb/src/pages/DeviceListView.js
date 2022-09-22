import DeviceListCard from "../components/DeviceListCard";
import SearchResultTop from "../components/SearchResultTop";
import styled from "styled-components";
import HttpService from "../services/HttpService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeviceListViewContainer = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
`;

const DeviceListView = () => {
  const [devices, setDevices] = useState([]);
  const { status } = useParams();

  useEffect(() => {
    HttpService.getAxiosClient()
      .get("/api/v0/devices")
      .then((response) => setDevices(response.data));
  }, []);

  let deviceList = devices

  if (status !== undefined) {
    if (status === "varningar") {
      deviceList = devices.filter((d) => d.status.code === 1)
    }
    if (status === "fel") {
      deviceList = devices.filter((d) => d.status.code === 2);
    }
    if (status === "online") {
      deviceList = devices.filter((d) => d.active);
    }
  }

  const listedObjects = deviceList.map((device) => {
    return (
      <DeviceListCard
        key={device.devEUI}
        device= {device}
        deviceUrl="deviceUrl"
        deviceStatus={status}
      />
    );
  });

  return (
    <DeviceListViewContainer>

      {listedObjects}
    </DeviceListViewContainer>
  );
};

export default DeviceListView;