import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainNav from "./components/Navigation";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <div className="darkTheme">
        <div className="background"></div>
        <div className="app">
          <MainNav />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
