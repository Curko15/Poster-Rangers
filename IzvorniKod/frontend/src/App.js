import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnterCodeScreen from "./screens/EnterCodeScreen";
import PosterScreen from "./screens/PosterScreen";
import PhotoScreen from "./screens/PhotoScreen";
import LiveVideoScreen from "./screens/LiveVideoScreen";
import PromoScreen from "./screens/PromoScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterCodeScreen />} />
        <Route path="/poster" element={<PosterScreen />} />
        <Route path="/foto" element={<PhotoScreen />} />
        <Route path="/live" element={<LiveVideoScreen />} />
        <Route path="/promo" element={<PromoScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
