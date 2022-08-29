import HttpService from "./HttpService";
import { useState, useEffect } from "react";

function useGetData(){
    const url = `https://6304e8f7697408f7edbdf8e8.mockapi.io/api/v0/devices`
    const [devices, setDevices] = useState([""])

    useEffect(() => {
        HttpService.getAxiosClient().get(url)
            .then(response => {
            setDevices(response.data);
        })
    }, [url]);

    if(devices){
       return devices
    }
}

const DeviceService = {
    useGetData,
}

export default DeviceService;