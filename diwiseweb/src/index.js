import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HttpService from './services/HttpService';
import UserService from './services/UserService';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () =>
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/device-management">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//renderApp();
UserService.initKeycloak(renderApp);
HttpService.configure();
