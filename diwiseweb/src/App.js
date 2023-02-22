import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import UserService from "./services/UserService";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Device from "./pages/Device";
import DeviceListView from "./pages/DeviceListView";
import FeatureView from './pages/FeatureView';
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapView from "./pages/MapView";

function adjustDevice(device) {
  if (device.status === undefined) {
    return device;
  }

  let s = device.status.statusCode;
  if (!(s === -1 || s === 0 || s === 2)) {
    device.status.statusCode = 1;
  }

  return device;
}

function updateDeviceState(s, obj) {
  let i = s.findIndex(x => x.devEUI === obj.devEUI);

  obj = adjustDevice(obj);

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

  return [...state];
}

const App = () => {
  const [devices, setDevices] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadDevices = async (token) => {
      let res = await fetch(`/api/v0/devices`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      let json = await res.json();
      setDevices(json.map((d) => adjustDevice(d)));
    };

    const loadFeatures = async (token) => {
      let res = await fetch(`/api/features`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      let json = await res.json();
      setFeatures(json);
    };

    const loadEventSource = async (token) => {
      await fetchEventSource(`/api/v0/events`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        async onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("connection made ", res);
            await loadDevices(token);
            await loadFeatures(token);
          }
        },
        onmessage(event) {
          let data = JSON.parse(event.data);
          console.log(event.event);
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
          console.log("connection closed");
        },
        onerror(err) {
          console.log("error: ", err)
        }
      })
    }

    let token = UserService.getToken();
    loadDevices(token);
    loadFeatures(token);
    loadEventSource(token);
  }, []);

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
          <Route path="/features" element={<FeatureView features={features} />} />
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
