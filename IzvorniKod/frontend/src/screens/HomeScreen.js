import React from "react";
import { useNavigate } from "react-router-dom";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import LiveVideo from "../components/LiveVideo";

import "../css/main.css";
import { getConferenceData, isUserLoggedIn } from "../services/AuthService";

const HomeScreen = () => {
  const navigate = useNavigate();
  const conference = JSON.parse(getConferenceData());

  return (
    <div>
      <Header viewType="homescreen" />
      <div className="title">
        <h1>{conference.ime}</h1>
        <h2>Neki od postera u natjecanju:</h2>
      </div>
      <ImageSlider view={"poster"} />
      <div className="viewAll">
        <button onClick={() => navigate("/posteri")}>Pogledaj sve</button>
      </div>
      {isUserLoggedIn() && (
        <>
          <ImageSlider view={"promo"} />
          <div className="viewAll">
            <button onClick={() => navigate("/promo")}>Pogledaj sve</button>
          </div>
        </>
      )}
      <LiveVideo />
      <div className="viewAll">
        <button onClick={() => navigate("/live")}>Gledaj live prijenos</button>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
