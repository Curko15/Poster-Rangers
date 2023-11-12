import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/liveVideo.css";
import "../css/main.css";
import LiveVideo from "../components/LiveVideo";

const PosterScreen = () => {
  return (
    <div>
      <Header />
      <h1>Live Video prijenos</h1>
      <h2>Glavna konferencijska dvorana</h2>
      <LiveVideo />
      <Footer />
    </div>
  );
};

export default PosterScreen;
