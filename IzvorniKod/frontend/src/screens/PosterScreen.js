import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import PosterDisplay from "../components/PosterDisplay";

import "../css/main.css";

const PosterScreen = () => {
  return (
    <div>
      <Header viewType="poster" />
      <div className="title">
        <h1>Pogledaj sve postere koji su se uključili u natjecanje!</h1>
      </div>
      <PosterDisplay />
      <Footer />
    </div>
  );
};

export default PosterScreen;
