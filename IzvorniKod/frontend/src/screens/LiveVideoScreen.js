import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import LiveVideo from "../components/LiveVideo";

import "../css/liveVideo.css";
import "../css/main.css";

const PosterScreen = () => {
  return (
    <div>
      <Header viewType="liveVideo" />
      <div className="title">
        <h1>Live Video prijenos</h1>
        <h2>Glavna konferencijska dvorana</h2>
      </div>
      <LiveVideo />
      <Footer />
    </div>
  );
};

export default PosterScreen;
