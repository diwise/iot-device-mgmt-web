import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import UserService from "./services/UserService";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Device from "./pages/Device";
import DeviceListView from "./pages/DeviceListView";
import FeatureView from './pages/FeatureView';
import Feature from './pages/Feature';
import MapView from "./pages/MapView";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

const App = () => {
  const [devices, setDevices] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadDevices = async () => {
      let res = await fetch(`/api/v0/devices`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      setDevices(result.map((d) => adjustDevice(d)));
    };

    const loadDevice = async (deviceID) => {
      let res = await fetch(`/api/v0/devices/${deviceID}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      return result;
    };

    const loadFeatures = async () => {
      let res = await fetch(`/api/features`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`
        }
      });
      let result = await res.json();
      setFeatures(result);
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
              await loadFeatures();
            });
          }
        },
        onmessage(event) {
          if (event.event === "keep-alive") {
            try {
              UserService.updateToken(() => { });
            } catch (error) {
              console.log(error);
            }
            return;
          }

          let data = JSON.parse(atob(event.data)); // atob is not deprecated in browsers, only node.js.

          switch (event.event) {
            case "device.created":
              setDevices((currentState) => {
                let i = currentState.findIndex((d) => { return d.deviceID === data.deviceID });
                if (i >= 0) {
                  console.log(`created device ${data.deviceID} already exists in device state`);
                } else {
                  let device = loadDevice(data.deviceID);
                  return [...currentState, adjustDevice(device)];
                }
              });
              break;
            case "device.updated":
              setDevices((currentState) => {
                return currentState.map((d) => {
                  if (d.deviceID === data.deviceID) {
                    let device = adjustDevice(loadDevice(data.deviceID));
                    return device;
                  } else {
                    return d;
                  }
                });
              });
              break;
            case "device-status":
              setDevices((currentState) => {
                return currentState.map((d) => {
                  if (d.deviceID === data.deviceID) {
                    d.lastObserved = data.timestamp;
                    return d;
                  } else {
                    return d;
                  }
                });
              });
              break;
            case "device.statusUpdated":
              setDevices((currentState) => {
                return currentState.map((d) => {
                  if (d.deviceID === data.deviceID) {
                    // TODO: fix status logic in backend

                    let s = data.status.statusCode;

                    if (!(s === -1 || s === 0 || s === 2)) {
                      data.status.statusCode = 1;
                    }

                    d.status = data.status;

                    if (d.lastObserved !== "0001-01-01T00:00:00Z" && data.timestamp !== "0001-01-01T00:00:00Z") {
                      d.lastObserved = data.timestamp;
                    }

                    return d;
                  } else {
                    return d;
                  }
                });
              });
              break;
            case "feature.updated":
              setFeatures((currentState) => {
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
              console.log(`event: ${event.event} unhandled`);
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

    loadDevices();
    loadFeatures();
    loadEventSource();
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
          <Route path="/features/:featureID" element={<Feature />} />
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
