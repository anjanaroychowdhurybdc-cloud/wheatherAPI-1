import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./components/Home";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import SavedLocations from "./components/SavedLocations";
import Settings from "./components/Settings";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/locations" element={<SavedLocations />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App;
