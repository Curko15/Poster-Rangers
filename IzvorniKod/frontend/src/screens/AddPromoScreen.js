import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import AddPromo from "../components/AddPromo";

import "../css/main.css";

const AddPromoScreen = () => {
  return (
    <div>
      <Header viewType="admin" />
      <div className="title">
        <h1>Dodavanje novog promotivnog materijala</h1>
      </div>
      <AddPromo />
      <Footer />
    </div>
  );
};

export default AddPromoScreen;
