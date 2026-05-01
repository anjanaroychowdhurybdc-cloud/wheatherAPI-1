import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import "./WeatherApp.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </HashRouter>
);
