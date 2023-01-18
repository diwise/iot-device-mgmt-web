import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import HttpService from "./services/HttpService";
import Dashboard from "./pages/Dashboard";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";
import Device from "./pages/Device";
import History from "./pages/History";
import Reports from "./pages/Reports";
import DeviceListView from "./pages/DeviceListView";

function App() {
  const [devices, setDevices] = useState([]);

  const adjustStatus = (obj) => {
    if (obj.status !== undefined) {
      let s = obj.status.statusCode;
      if (!(s === -1 || s === 0 || s === 2)) {
        obj.status.statusCode = 1;
      }
    }
    return obj;
  }

  useEffect(() => {
    HttpService.getAxiosClient()
      .get("/api/v0/devices")
      .then((response) => setDevices(response.data.map(e => {
        return adjustStatus(e);
      })));
  }, []);

  const [listening, setListening] = useState(false);
  useEffect(() => {
    const updateState = (s, obj) => {
      let newState = [];
      const i = s.findIndex(x => x.devEUI === obj.devEUI);

      obj = adjustStatus(obj);

      if (i > -1) {
        s[i] = obj;
        newState = [...s]
      } else {
        newState = [...s, obj]
      }

      return newState;
    }

    if (!listening) {
      fetchEventSource(`/api/v0/events`, {
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
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
          console.log(obj)
          setDevices((s) => updateState(s, obj))
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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/device/:deviceID" element={<Device />} />
          <Route path="/devices" element={<DeviceListView devices={devices} />} />
          <Route path="/devices/:status" element={<DeviceListView devices={devices} />} />
          <Route path="/historik" element={<History />} />
          <Route path="/rapporter" element={<Reports />} />
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
