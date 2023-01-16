import "./App.css";
import "./components/CardTemplate/cardtemplate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
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
  return (
    <>
      <div className="background"></div>
      <div className="app">
        <MainNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/device/:deviceID" element={<Device />} />
          <Route path="/devices" element={<DeviceListView />} />
          <Route path="/devices/:status" element={<DeviceListView />} />
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
