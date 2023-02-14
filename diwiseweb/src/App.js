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

function updateState(s, obj) {
  let newState = [];
  const i = s.findIndex(x => x.devEUI === obj.devEUI);

  obj = adjustStatus(obj);

  if (i > -1) {
    s[i] = obj;
  }

  newState = [...s];
  return newState;
}

function App() {
  const [devices, setDevices] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      fetchEventSource(`/api/v0/events`, {
        headers: {
          'Authorization': `Bearer ${UserService.getToken()}`
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);

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
          setDevices((s) => updateState(s, obj));                    
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
          <Route path="/map" element={<MapView devices={devices} />} />
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
