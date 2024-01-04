import React from "react";
import { useNavigate } from "react-router-dom";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import LiveVideo from "../components/LiveVideo";
import Map from "../components/Map";
import WeatherDisplay from "../components/WeatherDisplay";

import "../css/main.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header viewType="homescreen" />
      <div className="title">
        <h1>Dobrodošli!</h1>
        <h2>Neki od postera u natjecanju!</h2>
      </div>
      <ImageSlider />
      <div className="viewAll">
        <button onClick={() => navigate("/posteri")}>Pogledaj sve</button>
      </div>
      <LiveVideo />
      <div className="viewAll">
        <button onClick={() => navigate("/live")}>Gledaj live prijenos</button>
      </div>
      <div className="mapAndWeather">
        <div className="map">
          <Map />
        </div>
        <div className="weatherDisplay">
          <WeatherDisplay />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
