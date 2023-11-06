import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";

import "../css/main.css";
import PosterDisplay from "../components/PosterDisplay";

const PosterScreen = () => {
  return (
    <div>
      <Header />
      <h1>See all posters in competition!</h1>
      <PosterDisplay />
      <Footer />
    </div>
  );
};

export default PosterScreen;
