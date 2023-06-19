import CardTemplate from "../components/CardTemplate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInterval } from "../App";
import './pages.css';
import UserService from "../services/UserService";
import { DeviceInfo, DeviceState, Tenant, DeviceProfile, Location, Lwm2mTypes } from "../components/DeviceListCard";
import AlarmListCard from "../components/AlarmListCard"

const DeviceContainer = ({ children }) => {
  return (
    <div className="device-page">
      {children}
    </div>
  );
}

let d = {
  "active": true,
  "sensorID": "",
  "deviceID": "",
  "tenant": {
    "name": "default"
  },
  "name": "",
  "description": "",
  "location": {
    "latitude": 0,
    "longitude": 0,
    "altitude": 0
  },
  "environment": "",
  "types": [
    {
      "urn": ""
    }
  ],
  "tags": [],
  "deviceProfile": {
    "name": "",
    "decoder": "",
    "interval": 0
  },
  "deviceStatus": {
    "batteryLevel": 0,
    "lastObservedAt": "2023-04-17T06:55:12Z"
  },
  "deviceState": {
    "online": false,
    "state": 0,
    "observedAt": "2023-04-17T09:00:07.015774511Z"
  }
}



const Device = () => {
  const [device, setDevice] = useState(d)
  const { deviceID } = useParams();

  useEffect(() => {
    const loadDevice = async (token) => {
      let res = await fetch(`/api/v0/devices/${deviceID}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      let json = await res.json();
      setDevice(json);
    };

    loadDevice(UserService.getToken());
  }, [deviceID]);

  return (
    <DeviceContainer>
      <CardTemplate header="Sensorinformation" >
        <DeviceInfo device={device} />
        <DeviceProfile device={device} />
        <DeviceState device={device} />
        <Location device={device} />
        <Tenant device={device} />
        <Lwm2mTypes device={device} />
      </CardTemplate>
      <CardTemplate header="Larm" >
        <Alarms device={device} isExpanded={true} />
      </CardTemplate>
      <CardTemplate header="Sensorvärden" >
        <Measurements device={device} isExpanded={true} />
      </CardTemplate>
    </DeviceContainer>
  );
};

const loadAlarms = async (deviceID) => {
  const res = await fetch(`/api/v0/alarms?refID=${deviceID}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${UserService.getToken()}`
    }
  });
  let result = [];

  if (res.ok) {
    result = await res.json();
  }

  return result;
}

const Alarms = ({ device, isExpanded }) => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    UserService.updateToken(async () => {
      if (isExpanded) {
        let alarms = await loadAlarms(device.deviceID);
        setAlarms(alarms);
      }
    });
  }, [device.deviceID, isExpanded]);

  return (
    <div className="alarms">
      {alarms.map((a) => {
        return (
          <div key={a.id}>
            <AlarmListCard alarm={a} />
          </div>
        );
      })}
    </div>
  )
};

const loadMeasurements = async (deviceID) => {
  const res = await fetch(`/api/v0/measurements/${deviceID}?lastn=5&sort=desc`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${UserService.getToken()}`
    }
  });
  let result = [];

  if (res.ok) {
    result = await res.json();
  }

  return result;
}

const Measurements = ({ device, isExpanded }) => {
  const [measurements, setMeasurments] = useState([]);

  useEffect(() => {
    UserService.updateToken(async () => {
      let m = await loadMeasurements(device.deviceID);
      setMeasurments(m);
    });
  }, [device])

  useInterval(() => {
    UserService.updateToken(async () => {
      let m = await loadMeasurements(device.deviceID);
      setMeasurments(m);
    });
  }, 1000 * 30)

  let i = 0

  return (
    <div className="measurements">
      {measurements.map((m) => {
        return (
          <div key={i++}>
            <div><strong>Mottaget:</strong>{m.timestamp}</div>
            <div><pre>{JSON.stringify(m.pack, "", 4)}</pre></div>
          </div>
        );
      })}
    </div>
  )
};

export default Device;
