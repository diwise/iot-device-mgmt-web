import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <div className="background"></div>
      <div className="app">
        <MainNav />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
        <Footer
          customerLogoUrl="url here"
          customerLogoDescription="alt text here"
          customerPhoneNumber="08-123456"
          customerEmail="support@support.se"
          customerWebsite="https://google.com"
          faqUrl="/"
          faqText="FAQ"
          diwiseUrl="/"
          diwiseText="Diwise"
          githubUrl="/"
          githubText="GitHub"
          bugReportUrl="/"
          bugReportText="Rapportera en bugg"
        />
      </div>
    </>
  );
}

export default App;
