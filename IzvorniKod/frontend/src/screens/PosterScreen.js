import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import PosterDisplay from "../components/PosterDisplay";

import "../css/main.css";

const PosterScreen = () => {
  return (
    <div>
      <Header viewType="poster" />
      <h1>Odaberi svoj omiljeni poster</h1>
      <PosterDisplay />
      <Footer />
    </div>
  );
};

export default PosterScreen;
