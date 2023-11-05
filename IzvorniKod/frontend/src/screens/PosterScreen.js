import React from "react";
import Header from ".././components/Header.js";
import ImageSlider from "../components/ImageSlider.js";
import Footer from "../components/Footer";

import "../css/main.css";

const PosterScreen = () => {
  return (
    <div>
      <Header />
      <h1>Vote for your favourite poster!</h1>
      <ImageSlider />
      <Footer />
    </div>
  );
};

export default PosterScreen;
