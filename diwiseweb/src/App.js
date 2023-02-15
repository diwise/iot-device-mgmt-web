import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import UserService from "./services/UserService";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Device from "./pages/Device";
import DeviceListView from "./pages/DeviceListView";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapView from "./pages/MapView";

function adjustStatus(obj) {
  if (obj.status !== undefined) {
    let s = obj.status.statusCode;
    if (!(s === -1 || s === 0 || s === 2)) {
      obj.status.statusCode = 1;
    }
  }
  return obj;
}

function updateDeviceState(s, obj) {
  let i = s.findIndex(x => x.devEUI === obj.devEUI);

  obj = adjustStatus(obj);

  if (i > -1) {
    s[i] = obj;
  }

  return [...s];
}

function updateFeaturesState(state, obj) {
  let idx = state.findIndex(x => x.id === obj.id);

  if (idx > -1) {
    state[idx] = obj;
  }

  console.log(obj);

  return [...state];
}

function App() {
  const [devices, setDevices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [listening, setListening] = useState(false);

  const fetchDevices = () => {
    fetch(`/api/v0/devices`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${UserService.getToken()}`
      },
    }).then(res => res.json())
      .then(json => {
        setDevices(json.map((e) => {
          return adjustStatus(e);
        }));
      });
  };

  const fetchFeatures = () => {
    fetch(`/api/features`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${UserService.getToken()}`
      },
    }).then(res => res.json())
      .then(json => {
        setFeatures(json);
      });
  };

  useEffect(() => {
    fetchDevices();
    fetchFeatures();
  }, []);

  useEffect(() => {
    if (!listening) {
      fetchEventSource(`/api/v0/events`, {
        headers: {
          'Authorization': `Bearer ${UserService.getToken()}`
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
            fetchDevices();
            fetchFeatures();

          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          const data = JSON.parse(event.data);
          switch (event.event) {
            case "deviceUpdated": setDevices((s) => updateDeviceState(s, data)); break;
            case "deviceCreated": setDevices((s) => updateDeviceState(s, data)); break;
            case "lastObservedUpdated": setDevices((s) => updateDeviceState(s, data)); break;
            case "feature.updated": setFeatures((s) => updateFeaturesState(s, data)); break;
            default:
              console.log(`event: ${event.event} is not implemented!`);
          };
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
      <div className="background"></div>
      <div className="app">
        <MainNav />
        <Routes>
          <Route path="/" element={<Dashboard devices={devices} />} />
          <Route path="/device/:deviceID" element={<Device />} />
          <Route path="/devices" element={<DeviceListView devices={devices} />} />
          <Route path="/devices/:status" element={<DeviceListView devices={devices} />} />
          <Route path="/map" element={<MapView devices={devices} features={features} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer
          customerLogoUrl={window._env_.CUSTOMER_LOGO_URL}
          customerLogoDescription="logo"
          customerPhoneNumber="08-123456"
          customerEmail="support@diwise.io"
          customerWebsite="https://diwise.io"
          faqUrl="/"
          faqText="FAQ"
          diwiseUrl="https://diwise.se/"
          diwiseText="Diwise"
          githubUrl="https://diwise.github.io"
          githubText="GitHub"
          bugReportUrl="https://github.com/diwise/iot-device-mgmt-web/issues"
          bugReportText="Rapportera en bugg"
        />
      </div>
    </>
  );
}

export default App;
