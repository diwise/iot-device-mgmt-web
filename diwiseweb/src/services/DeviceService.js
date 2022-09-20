import HttpService from "./HttpService";
import { useState, useEffect } from "react";

function useGetData() {
  const url = '/api/v0/device';
  const [devices, setDevices] = useState([""]);

  useEffect(() => {
    HttpService.getAxiosClient()
      .get(url)
      .then((response) => {
        setDevices(response.data);
      });
  }, [url]);

  if (devices) {
    return devices
  }
}

const DeviceService = {
  useGetData,
};

export default DeviceService;
