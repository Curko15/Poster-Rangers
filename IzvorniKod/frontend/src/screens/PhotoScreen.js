import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";

import "../css/main.css";

const PosterScreen = () => {
  return (
    <div>
      <Header viewType="photo" />
      <div className="title">
        <h1>Pregled fotografija</h1>
      </div>
      <Footer />
    </div>
  );
};

export default PosterScreen;
