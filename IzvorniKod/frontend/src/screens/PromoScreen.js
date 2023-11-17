import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";

import "../css/main.css";

const PromoScreen = () => {
  return (
    <div>
      <Header viewType="promo" />
      <div className="title">
        <h1>Promotivni materijali</h1>
        <h2>Pogledaj što ti sve naši sponzori nude</h2>
      </div>
      <Footer />
    </div>
  );
};

export default PromoScreen;
