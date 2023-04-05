import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import UserService from "./services/UserService";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Device from "./pages/Device";
import DeviceListView from "./pages/DeviceListView";
import FunctionView from './pages/FunctionView';
import Funcs from './pages/Func';
import MapView from "./pages/MapView";
import Alarms from "./pages/Alarms";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [devices, setDevices] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const loadDevices = async () => {
      let res = await fetch(`/api/v0/devices`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      setDevices(result);
    };

    const loadAlarms = async () => {
      let res = await fetch(`/api/v0/alarms?active=true`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      setAlarms(result);
    };

    const loadDevice = async (deviceID) => {
      const res = await fetch(`/api/v0/devices/${deviceID}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let device = await res.json();
      return device;
    };

    const loadFunctions = async () => {
      let res = await fetch(`/api/functions`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      setFunctions(result);
    };

    const loadEventSource = async () => {
      await fetchEventSource(`/api/v0/events`, {
        headers: {
          'Authorization': `Bearer ${UserService.getToken()}`
        },
        async onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("connection made ", res);

            UserService.updateToken(async () => {
              await loadDevices();
              await loadFunctions();
              await loadAlarms();
            });
          }
        },
        async onmessage(event) {
          if (event.event === "keep-alive") {
            try {
              UserService.updateToken(() => { });
            } catch (error) {
              console.log(error);
            }
            return;
          }

          let data = JSON.parse(atob(event.data)); // atob is not deprecated in browsers, only node.js.
          let device = {};

          switch (event.event) {
            case "device.created":
              setDevices((currentState) => {
                let i = currentState.findIndex((d) => { return d.deviceID === data.deviceID });
                if (i >= 0) {
                  console.log(`created device ${data.deviceID} already exists in device state`);
                } else {
                  let device = loadDevice(data.deviceID);
                  return [...currentState, device];
                }
              });
              break;
            case "device.updated":
              device = await loadDevice(data.deviceID);

              setDevices((current) => {
                return current.map(d => {
                  if (d.deviceID === data.deviceID) {
                    return device;
                  }
                  return d;
                });
              });
              break;
            case "device-status":
              device = await loadDevice(data.deviceID);

              setDevices((current) => {
                return current.map(d => {
                  if (d.deviceID === data.deviceID) {
                    return device;
                  }
                  return d;
                });
              });

              break;
            case "device.statusUpdated":
              device = await loadDevice(data.deviceID);

              setDevices((current) => {
                return current.map(d => {
                  if (d.deviceID === data.deviceID) {
                    return device;
                  }
                  return d;
                });
              });

              break;
            case "device.stateUpdated":
              device = await loadDevice(data.deviceID);

              setDevices((current) => {
                return current.map(d => {
                  if (d.deviceID === data.deviceID) {
                    return device;
                  }
                  return d;
                });
              });

              break;
            case "function.updated":
              setFunctions((currentState) => {
                return currentState.map((func) => {
                  if (func.ID === data.ID) {
                    return data;
                  } else {
                    return func;
                  }
                });
              });

              break;
            default:
              if (event.event.startsWith("alarms.")) {
                loadAlarms();
              } else {
                console.log(`event: ${event.event} unhandled`);
              }
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

    UserService.updateToken(async () => {
      await loadDevices();
      await loadFunctions();
      await loadAlarms();
      await loadEventSource();
    });
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="app">
        <MainNav />
        <Routes>
          <Route path="/" element={<Dashboard devices={devices} alarms={alarms} />} />
          <Route path="/device/:deviceID" element={<Device />} />
          <Route path="/devices" element={<DeviceListView devices={devices} />} />
          <Route path="/devices/:deviceState" element={<DeviceListView devices={devices} />} />
          <Route path="/map" element={<MapView devices={devices} features={functions} />} />
          <Route path="/functions" element={<FunctionView functions={functions} />} />
          <Route path="/functions/:functionID" element={<Funcs />} />
          <Route path="/alarms" element={<Alarms alarms={alarms} />} />
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
