import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";

import "../css/main.css";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <h1>Dobrodošli!</h1>
      <h2>Neki od postera u natjecanju!</h2>
      <ImageSlider />
      <div className="viewAll">
        <button onClick={() => navigate("/posteri")}>Pogledaj sve</button>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
