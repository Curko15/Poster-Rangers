import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PosterScreen from "./screens/PosterScreen";
import PhotoScreen from "./screens/PhotoScreen";
import LiveVideoScreen from "./screens/LiveVideoScreen";
import PromoScreen from "./screens/PromoScreen";
import VoteScreen from "./screens/VoteScreen";
import HomeScreen from "./screens/HomeScreen";
import EnterCodeScreen from "./screens/EnterCodeScreen";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import SuperAdminScreen from "./screens/SuperAdminScreen";
import AdminScreen from "./screens/AdminScreen";
import AddConference from "./components/AddConference";
import AddPosterScreen from "./screens/AddPosterScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterCodeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route
          path="/login"
          element={<AuthenticationScreen viewType="login" />}
        />
        <Route
          path="/register"
          element={<AuthenticationScreen viewType="register" />}
        />
        <Route path="/posteri" element={<PosterScreen />} />
        <Route path="/glasanje" element={<VoteScreen />} />
        <Route path="/foto" element={<PhotoScreen />} />
        <Route path="/live" element={<LiveVideoScreen />} />
        <Route path="/promo" element={<PromoScreen />} />
        <Route path="/dodajKonf" element={<AddConference />} />
        <Route path="/superAdmin" element={<SuperAdminScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/dodajPoster" element={<AddPosterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
